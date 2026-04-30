
import {z} from "zod";

export const UserPasswordChangeRequestSchema = z.object({
    currentPassword: z.string().min(8).max(100),
    newPassword: z.string().min(8).max(100)
});

export type UserPasswordChangeRequestDto = z.infer<typeof UserPasswordChangeRequestSchema>;