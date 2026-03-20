"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AppointmentsService = class AppointmentsService {
    prisma;
    SAFETY_BUFFER_MINUTES = 15;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAppointmentDto) {
        const { userId, serviceId, startTime } = createAppointmentDto;
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.BadRequestException('Usuário não encontrado');
        const service = await this.prisma.service.findUnique({ where: { id: serviceId } });
        if (!service)
            throw new common_1.BadRequestException('Serviço não encontrado');
        const start = new Date(startTime);
        const end = new Date(start.getTime() + (service.durationMins + this.SAFETY_BUFFER_MINUTES) * 60000);
        const overlappingCount = await this.prisma.appointment.count({
            where: {
                status: { notIn: ['CANCELLED', 'COMPLETED'] },
                OR: [
                    { startTime: { lte: start }, endTime: { gt: start } },
                    { startTime: { lt: end }, endTime: { gte: end } },
                    { startTime: { gte: start }, endTime: { lte: end } }
                ]
            }
        });
        if (overlappingCount > 0) {
            throw new common_1.ConflictException('O horário selecionado colide com um compromisso existente (Double-Booking).');
        }
        if (start.getTime() < Date.now()) {
            throw new common_1.BadRequestException('Não é possível agendar no passado.');
        }
        const hoursToStart = (start.getTime() - Date.now()) / (1000 * 60 * 60);
        if (hoursToStart < 12) {
            throw new common_1.BadRequestException('Agendamentos devem ter pelo menos 12 horas de antecedência.');
        }
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
    findOne(id) {
        return this.prisma.appointment.findUnique({ where: { id }, include: { user: true, service: true } });
    }
    update(id, updateAppointmentDto) {
        return this.prisma.appointment.update({
            where: { id },
            data: updateAppointmentDto,
        });
    }
    remove(id) {
        return this.prisma.appointment.update({
            where: { id },
            data: { status: 'CANCELLED' }
        });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map