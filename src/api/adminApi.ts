import { z } from "zod";
import { httpClientConfig } from "./http-client";
import { type PagedResponseDto, PagedResponseSchema } from "../DTO/Common/PagedResponseDto";
import { type AdminUserResponseDto, AdminUserResponseSchema } from "../DTO/Admin/AdminUserResponseDto";
import { type AdminUpdateRolesRequestDto, AdminUpdateRolesRequestSchema  } from "../DTO/Admin/AdminUpdateRolesRequestDto";

const AllUsersResponseSchema = PagedResponseSchema(AdminUserResponseSchema);


export const getAllUsers = async (page: number, pageSize: number) : Promise<PagedResponseDto<AdminUserResponseDto>> => {

    const response = await httpClientConfig.get("/admin/users", { params: { page, pageSize } }); // page - it's number of page, pageSize - number of items per page

    return AllUsersResponseSchema.parse(response);
};

export const updateUserRoles = async (roles : AdminUpdateRolesRequestDto) : Promise<AdminUserResponseDto> => {

    const validatedRequest = AdminUpdateRolesRequestSchema.parse(roles);
    const response = await httpClientConfig.put(`/admin/users/${validatedRequest.userId}/roles`,{roles: validatedRequest.roles});

    return AdminUserResponseSchema.parse(response);
}

export const getRoles = async () : Promise<string[]> => {

    const response = await httpClientConfig.get("/admin/roles");

    return z.array(z.string()).parse(response);
}

export const adminApi = {
    getAllUsers,
    updateUserRoles,
    getRoles
}