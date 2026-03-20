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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createUserDto) {
        return this.prisma.user.create({
            data: createUserDto,
        });
    }
    findAll() {
        return this.prisma.user.findMany({
            include: { promoCodes: true }
        });
    }
    findOne(id) {
        return this.prisma.user.findUnique({
            where: { id },
            include: { promoCodes: true }
        });
    }
    update(id, updateUserDto) {
        return this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
    }
    remove(id) {
        return this.prisma.user.delete({
            where: { id }
        });
    }
    async generateReferralCode(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado.');
        const baseCode = user.name.substring(0, 4).toUpperCase() + Math.floor(1000 + Math.random() * 9000);
        return this.prisma.promoCode.create({
            data: {
                code: baseCode,
                userId: user.id,
                discountPct: 30,
                isUsed: false,
            }
        });
    }
    async rewardPromoter(promoCodeId) {
        const promoCode = await this.prisma.promoCode.findUnique({ where: { id: promoCodeId } });
        if (!promoCode || promoCode.isUsed) {
            throw new Error('Código promocional inválido ou já resgatado.');
        }
        const rewardCode = await this.prisma.promoCode.create({
            data: {
                code: `REWARD-${Math.floor(10000 + Math.random() * 90000)}`,
                userId: promoCode.userId,
                discountPct: 30,
                isUsed: false,
            }
        });
        await this.prisma.promoCode.update({
            where: { id: promoCode.id },
            data: { isUsed: true, usedAt: new Date() }
        });
        return rewardCode;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map