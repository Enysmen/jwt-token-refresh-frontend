import authService  from "../../auth/authService"; 
import { useState } from "react";



export function LoginPage() 
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async () => {
        try {
            await authService.getLoginResponse({ username, password });
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed', error);
            setIsAuthenticated(false);
        }
    };

function handleLogout() {
    authService.logout();
    setIsAuthenticated(false);
}

return (
    <div>
    <h2>Auth test</h2>
        {isAuthenticated ? (
            <>
            <p>Logged in successfully!</p>
            <button onClick={handleLogout}>Logout</button>
            </>
        ):(
            <>
            <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> 
            <button onClick={handleLogin}>Login</button>
            </>
        )}
    </div>
 );

}
