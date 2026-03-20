import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: any) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: { promoCodes: true }
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { promoCodes: true }
    });
  }

  update(id: string, updateUserDto: any) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: { id }
    });
  }

  // Regra de Negócio 4: MGM (Member gets Member) / Indicação
  // Gera um código autoral para distribuição aos usuários ativos
  async generateReferralCode(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado.');

    // Gera um código único baseado no nome
    const baseCode = user.name.substring(0, 4).toUpperCase() + Math.floor(1000 + Math.random() * 9000);

    return this.prisma.promoCode.create({
      data: {
        code: baseCode,
        userId: user.id,
        discountPct: 30, // Desconto residual de 30% estocástico
        isUsed: false,
      }
    });
  }

  // Called when a new user registers using a referral code and completes their first session
  async rewardPromoter(promoCodeId: string) {
    const promoCode = await this.prisma.promoCode.findUnique({ where: { id: promoCodeId } });
    if (!promoCode || promoCode.isUsed) {
      throw new Error('Código promocional inválido ou já resgatado.');
    }

    // O Promotor recebe um desconto de 30% em sua conta (Criamos um código de recompensa interno)
    const rewardCode = await this.prisma.promoCode.create({
      data: {
        code: `REWARD-${Math.floor(10000 + Math.random() * 90000)}`,
        userId: promoCode.userId,
        discountPct: 30,
        isUsed: false,
      }
    });

    // Marco o código original como usado (a nova indicação consumou a primeira sessão)
    await this.prisma.promoCode.update({
      where: { id: promoCode.id },
      data: { isUsed: true, usedAt: new Date() }
    });

    return rewardCode;
  }
}
