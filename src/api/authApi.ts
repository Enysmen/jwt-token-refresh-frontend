import { httpClientConfig } from "./http-client";
import type { BaseUserDTO } from "../DTO/User/BaseUserDTO";
import type { LoginRequestDto } from "../DTO/Auth/LoginRequestDto";
import type { LoginResponseDto } from "../DTO/Auth/LoginResponseDto";
import type { RegisterRequestDto } from "../DTO/Auth/RegisterRequestDto";
import type { RegisterResponseDto } from "../DTO/Auth/RegisterResponseDto";
import type { ConfirmEmailRequestDto } from "../DTO/Auth/ConfirmEmailRequestDto";
import type { ConfirmEmailResponseDto } from "../DTO/Auth/ConfirmEmailResponseDto";


export const login =  async (loginData: LoginRequestDto) : Promise<LoginResponseDto> => {
    return await httpClientConfig.post("/auth/login", {
        email: loginData.email,
        password: loginData.password
    });
}

export const register = async (registerData: RegisterRequestDto) : Promise<RegisterResponseDto> => {
    return await httpClientConfig.post("/auth/register", {
        email: registerData.email,
        password: registerData.password,
        userName: registerData.userName,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        acceptTerms: registerData.acceptTerms,
        language: registerData.language
    });
}

export const logout = async () => {
    return await httpClientConfig.post("/auth/logout",{},{ isLogoutRequest: true  });
}

export const getCurrentUser = async (): Promise<BaseUserDTO> => {
    return await httpClientConfig.get("/auth/me",{antiCache: true});
}

export const refreshToken = async () => {
    return await httpClientConfig.post("/auth/refresh-token",{},{ isRefreshingRequest: true });
}

export const confirmEmail = async (confirmEmailData: ConfirmEmailRequestDto) : Promise<ConfirmEmailResponseDto> => {
    return await httpClientConfig.post("/auth/confirm-email", {
        token: confirmEmailData.token
    });
}



export const authApi = {
    login,
    register,
    logout,
    getCurrentUser,
    refreshToken,
    confirmEmail
}
