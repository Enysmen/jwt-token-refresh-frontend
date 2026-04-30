import {z} from "zod";


export const RegisterResponseSchema = z.object({
    userId: z.string().uuid(),
    requiresEmailConfirmation: z.boolean()
});

export type RegisterResponseDto = z.infer<typeof RegisterResponseSchema>;
