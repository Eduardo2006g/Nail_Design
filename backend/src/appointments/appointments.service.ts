import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  // 15 minutos adicionais fixos no final (Gordura/Respiro para assepsia/bancada)
  private readonly SAFETY_BUFFER_MINUTES = 15;

  constructor(private readonly prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const { userId, serviceId, startTime } = createAppointmentDto;

    // Verificar se usuário e serviço existem
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new BadRequestException('Usuário não encontrado');

    const service = await this.prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) throw new BadRequestException('Serviço não encontrado');

    const start = new Date(startTime);
    // Duração total = tempo do serviço + gordura
    const end = new Date(start.getTime() + (service.durationMins + this.SAFETY_BUFFER_MINUTES) * 60000);

    // Regra: Bloqueio Categórico (Anti-Conflito / Double Booking)
    // O horário desejado não pode colidir com nenhum agendamento fixado.
    const overlappingCount = await this.prisma.appointment.count({
      where: {
        status: { notIn: ['CANCELLED', 'COMPLETED'] }, 
        OR: [
          // Conflito 1: O novo inicia durante um existente
          { startTime: { lte: start }, endTime: { gt: start } },
          // Conflito 2: O novo termina durante um existente
          { startTime: { lt: end }, endTime: { gte: end } },
          // Conflito 3: O novo engloba inteiramente um existente
          { startTime: { gte: start }, endTime: { lte: end } }
        ]
      }
    });

    if (overlappingCount > 0) {
      throw new ConflictException('O horário selecionado colide com um compromisso existente (Double-Booking).');
    }

    // Regra: Janelas de Restrição
    if (start.getTime() < Date.now()) {
      throw new BadRequestException('Não é possível agendar no passado.');
    }

    // Antecedência mínima (ex: 12 horas)
    const hoursToStart = (start.getTime() - Date.now()) / (1000 * 60 * 60);
    if (hoursToStart < 12) {
      throw new BadRequestException('Agendamentos devem ter pelo menos 12 horas de antecedência.');
    }

    // Realiza Agendamento
    return this.prisma.appointment.create({
      data: {
        userId,
        serviceId,
        startTime: start,
        endTime: end,
        totalPrice: service.price,
        status: 'PENDING',
      }
    });
  }

  findAll() {
    return this.prisma.appointment.findMany({
      include: { user: true, service: true },
      orderBy: { startTime: 'asc' }
    });
  }

  findOne(id: string) {
    return this.prisma.appointment.findUnique({ where: { id }, include: { user: true, service: true } });
  }

  update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    return this.prisma.appointment.update({
      where: { id },
      data: updateAppointmentDto,
    });
  }

  remove(id: string) {
    return this.prisma.appointment.update({
      where: { id },
      data: { status: 'CANCELLED' }
    });
  }
}
