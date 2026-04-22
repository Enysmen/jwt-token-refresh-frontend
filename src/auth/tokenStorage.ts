
const ACCESS_TOKEN_KEY = 'accessToken'; 
const REFRESH_TOKEN_KEY = 'refreshToken';

export const tokenStorage = {
    saveTokensFromLoginResponse,
    getAccessToken,
    removeTokens,
};



export function saveTokensFromLoginResponse(accessToken: string, refreshToken: string): void
{
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function getAccessToken(): string | null{
    
        const accessToken : string | null =  localStorage.getItem(ACCESS_TOKEN_KEY);
        return accessToken;
}

export function removeTokens(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);    
}


export default tokenStorage;