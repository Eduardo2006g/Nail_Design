import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: any): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        promoCodes: {
            id: string;
            createdAt: Date;
            code: string;
            discountPct: number;
            isUsed: boolean;
            usedAt: Date | null;
            userId: string;
        }[];
    } & {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UserClient<({
        promoCodes: {
            id: string;
            createdAt: Date;
            code: string;
            discountPct: number;
            isUsed: boolean;
            usedAt: Date | null;
            userId: string;
        }[];
    } & {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateUserDto: any): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        phone: string | null;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    generateReferralCode(userId: string): Promise<{
        id: string;
        createdAt: Date;
        code: string;
        discountPct: number;
        isUsed: boolean;
        usedAt: Date | null;
        userId: string;
    }>;
    rewardPromoter(promoCodeId: string): Promise<{
        id: string;
        createdAt: Date;
        code: string;
        discountPct: number;
        isUsed: boolean;
        usedAt: Date | null;
        userId: string;
    }>;
}
