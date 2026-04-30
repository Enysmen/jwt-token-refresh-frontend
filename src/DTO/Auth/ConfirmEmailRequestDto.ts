import {z} from "zod";

export const ConfirmEmailRequestSchema = z.object({
    token: z.string().min(1)
});

export type ConfirmEmailRequestDto = z.infer<typeof ConfirmEmailRequestSchema>;