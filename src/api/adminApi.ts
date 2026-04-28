import { httpClientConfig } from "./http-client";
import type {AdminUserResponseDto} from "../DTO/Admin/AdminUserResponseDto";
import type { AdminUpdateRolesRequestDto } from "../DTO/Admin/AdminUpdateRolesRequestDto";
import type { PagedResponseDto } from "../DTO/Common/PagedResponseDto";



export const getAllUsers = async (page: number, pageSize: number) : Promise<PagedResponseDto<AdminUserResponseDto>> => {
    return await httpClientConfig.get("/admin/users", { params: { page, pageSize } }); // page - it's number of page, pageSize - number of items per page
 }

export const updateUserRoles = async (roles : AdminUpdateRolesRequestDto) : Promise<AdminUserResponseDto> => {
    return await httpClientConfig.put(`/admin/users/${roles.userId}/roles`,{roles: roles.roles});
}

export const getRoles = async () : Promise<string[]> => {
    return await httpClientConfig.get("/admin/roles");
}

export const adminApi = {
    getAllUsers,
    updateUserRoles,
    getRoles
}