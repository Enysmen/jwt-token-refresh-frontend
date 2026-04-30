import { BaseUserSchema } from "../User/BaseUserDTO";
import {z} from "zod";


export const LoginResponseSchema = z.object({
    user: BaseUserSchema
});

export type LoginResponseDto = z.infer<typeof LoginResponseSchema>;