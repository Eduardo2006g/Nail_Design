import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
export declare class AppointmentsService {
    private readonly prisma;
    private readonly SAFETY_BUFFER_MINUTES;
    constructor(prisma: PrismaService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        startTime: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        endTime: Date;
        totalPrice: number;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        user: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            passwordHash: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
        service: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number;
            durationMins: number;
            isActive: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        startTime: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        endTime: Date;
        totalPrice: number;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__AppointmentClient<({
        user: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            passwordHash: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
        service: {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            price: number;
            durationMins: number;
            isActive: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        startTime: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        endTime: Date;
        totalPrice: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateAppointmentDto: UpdateAppointmentDto): import(".prisma/client").Prisma.Prisma__AppointmentClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        startTime: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        endTime: Date;
        totalPrice: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__AppointmentClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        serviceId: string;
        startTime: Date;
        status: import(".prisma/client").$Enums.AppointmentStatus;
        endTime: Date;
        totalPrice: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
