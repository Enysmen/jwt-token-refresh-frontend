import {z} from "zod";

export const AdminUpdateRolesRequestSchema = z.object({
    userId: z.string().uuid(),
    roles: z.array(z.string())
});
export type AdminUpdateRolesRequestDto = z.infer<typeof AdminUpdateRolesRequestSchema>;