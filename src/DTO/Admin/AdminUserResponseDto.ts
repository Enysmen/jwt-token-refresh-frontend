import type {BaseUserDTO} from "../User/BaseUserDTO";

export interface AdminUserResponseDto extends BaseUserDTO {
    createdAt: string;       
    lastLoginAt?: string;     
    isActive: boolean;       
    isBanned: boolean;       
    isEmailVerified: boolean; 
}