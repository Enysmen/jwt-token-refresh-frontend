import {z} from "zod";

export const ConfirmEmailResponseSchema = z.object({
    success: z.boolean(),
    message: z.string().max(200)
});

export type ConfirmEmailResponseDto = z.infer<typeof ConfirmEmailResponseSchema>;