export interface BaseUserDTO {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    roles: string[];
    phoneNumber?: string;
}