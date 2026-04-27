export interface RegisterRequestDto {
    email: string;
    password: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    acceptTerms: boolean;
    language?: string; 
}