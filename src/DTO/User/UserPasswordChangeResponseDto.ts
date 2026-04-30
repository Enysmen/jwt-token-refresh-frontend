import {z} from "zod";

export const UserPasswordChangeResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().max(200)
});

export type UserPasswordChangeResponseDto = z.infer<typeof UserPasswordChangeResponseSchema>;