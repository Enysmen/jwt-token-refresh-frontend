import type {LoginRequestDto,LoginResponseDto } from '../auth/auth.dto';
import {authApi} from '../api/authApi'; 
import { tokenStorage } from './tokenStorage';

export const authService = {
    getLoginResponse,
    logout,
};

export async function getLoginResponse(dto:LoginRequestDto): Promise<LoginResponseDto>
{
    const loginResponse : LoginResponseDto =  await authApi.login(dto); 
    tokenStorage.saveTokensFromLoginResponse(loginResponse.accessToken, loginResponse.refreshToken);
    return loginResponse;
}

export function logout(): void {
    tokenStorage.removeTokens();
}

export default authService;


 