import {z} from "zod";

export const RegisterRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
    userName: z.string().min(3).max(50),
    firstName: z.string().max(100).optional().nullable(),
    lastName: z.string().max(100).optional().nullable(),
    acceptTerms: z.boolean(),
    language: z.string().max(3).optional().nullable(),
    phoneNumber: z.string().max(20).optional().nullable()
}); 

export type RegisterRequestDto = z.infer<typeof RegisterRequestSchema>;

