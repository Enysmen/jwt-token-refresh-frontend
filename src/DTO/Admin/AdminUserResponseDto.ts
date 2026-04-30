import {BaseUserSchema} from "../User/BaseUserDTO";
import {z} from "zod";


export const AdminUserResponseSchema = BaseUserSchema.extend({
    createdAt: z.string().datetime(),
    lastLoginAt: z.string().datetime().optional().nullable(),
    isActive: z.boolean(),
    isBanned: z.boolean(),
    isEmailVerified: z.boolean()
});

export type AdminUserResponseDto = z.infer<typeof AdminUserResponseSchema>;

    

