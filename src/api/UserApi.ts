import {httpClientConfig} from "./http-client";
import type { UserPasswordChangeRequestDto } from "../DTO/User/UserPasswordChangeRequestDto";
import type { UserPasswordChangeResponseDto } from "../DTO/User/UserPasswordChangeResponseDto";


export const changePassword = async (changePasswordData: UserPasswordChangeRequestDto): Promise<UserPasswordChangeResponseDto> => {
    return await httpClientConfig.put("/account/change-password", {
        currentPassword: changePasswordData.currentPassword,
        newPassword: changePasswordData.newPassword
    });
}

export const userApi = {
    changePassword  
};