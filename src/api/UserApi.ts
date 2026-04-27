import {httpClientConfig} from "./http-client";
import type { UserPasswordChangeRequest } from "../DTO/User/UserPasswordChangeRequest";
import type { UserPasswordChangeResponse } from "../DTO/User/UserPasswordChangeResponse";


export const changePassword = async (changePasswordData: UserPasswordChangeRequest): Promise<UserPasswordChangeResponse> => {
    return await httpClientConfig.put("/account/change-password", {
        currentPassword: changePasswordData.currentPassword,
        newPassword: changePasswordData.newPassword
    });
}
