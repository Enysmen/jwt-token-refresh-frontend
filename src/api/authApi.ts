import { httpClientConfig } from "./http-client";

import type { LoginRequestDto } from "../DTO/Auth/LoginRequestDto";
import type { RegisterRequestDto } from "../DTO/Auth/RegisterRequestDto";
import type { ConfirmEmailRequestDto } from "../DTO/Auth/ConfirmEmailRequestDto";

import { type BaseUserDTO , BaseUserSchema } from "../DTO/User/BaseUserDTO";
import { type LoginResponseDto , LoginResponseSchema  } from "../DTO/Auth/LoginResponseDto";
import { type  RegisterResponseDto, RegisterResponseSchema } from "../DTO/Auth/RegisterResponseDto";
import { type  ConfirmEmailResponseDto , ConfirmEmailResponseSchema } from "../DTO/Auth/ConfirmEmailResponseDto";




export const login =  async (loginData: LoginRequestDto) : Promise<LoginResponseDto> => {

     const response = await httpClientConfig.post("/auth/login", {
        email: loginData.email,
        password: loginData.password
    });

    return LoginResponseSchema.parse(response);
}

export const register = async (registerData: RegisterRequestDto) : Promise<RegisterResponseDto> => {

     const response = await httpClientConfig.post("/auth/register", {
        email: registerData.email,
        password: registerData.password,
        userName: registerData.userName,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        acceptTerms: registerData.acceptTerms,
        language: registerData.language
    });

    return RegisterResponseSchema.parse(response);
}

export const logout = async () => {
    return await httpClientConfig.post("/auth/logout",{},{ isLogoutRequest: true  });
}

export const getCurrentUser = async (): Promise<BaseUserDTO> => {

    const response = await httpClientConfig.get("/auth/me",{antiCache: true});

    return BaseUserSchema.parse(response);
}

export const refreshToken = async () => {
    return await httpClientConfig.post("/auth/refresh-token",{},{ isRefreshingRequest: true });
}

export const confirmEmail = async (confirmEmailData: ConfirmEmailRequestDto) : Promise<ConfirmEmailResponseDto> => {

    const response = await httpClientConfig.post("/auth/confirm-email", {
        token: confirmEmailData.token
    });
    
    return ConfirmEmailResponseSchema.parse(response);
}



export const authApi = {
    login,
    register,
    logout,
    getCurrentUser,
    refreshToken,
    confirmEmail
}
