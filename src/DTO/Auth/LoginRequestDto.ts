import {z} from "zod";

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100)
});

export type LoginRequestDto = z.infer<typeof LoginRequestSchema>;