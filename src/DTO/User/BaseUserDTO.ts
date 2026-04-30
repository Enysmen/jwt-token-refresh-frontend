import {z} from "zod";

export const BaseUserSchema = z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    username: z.string().min(2).max(50),
    firstName: z.string().max(100).optional().nullable(),
    lastName: z.string().max(100).optional().nullable(),
    roles: z.array(z.string()),
    phoneNumber: z.string().max(20).optional().nullable(),
});

export type BaseUserDTO = z.infer<typeof BaseUserSchema>;   