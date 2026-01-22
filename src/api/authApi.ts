import type {LoginRequestDto } from '../auth/auth.dto';
import type {LoginResponseDto } from '../auth/auth.dto';
import { httpClient } from './httpClient';

export const authApi = {
    login,
};


export function login(dto:LoginRequestDto): Promise<LoginResponseDto> 
{ 
    return httpClient<LoginResponseDto>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(dto),
    });
}

export default authApi;