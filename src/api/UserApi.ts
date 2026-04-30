import {httpClientConfig} from "./http-client";
import type { UserPasswordChangeRequestDto } from "../DTO/User/UserPasswordChangeRequestDto";
import { type UserPasswordChangeResponseDto , UserPasswordChangeResponseSchema  } from "../DTO/User/UserPasswordChangeResponseDto";


export const changePassword = async (changePasswordData: UserPasswordChangeRequestDto): Promise<UserPasswordChangeResponseDto> => {

    const response = await httpClientConfig.put("/account/change-password", {
        currentPassword: changePasswordData.currentPassword,
        newPassword: changePasswordData.newPassword
    });
    
    return UserPasswordChangeResponseSchema.parse(response);
}

export const userApi = {
    changePassword  
};