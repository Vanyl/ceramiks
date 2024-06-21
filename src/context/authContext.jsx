import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [authState, setAuthState] = useState({
        token: null,
        username: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const username = localStorage.getItem('username');
        if (token && username) {
            setAuthState({ token, username });
        }
    }, []);

    const login = (token, username) => {
        setAuthState({ token, username });
        localStorage.setItem('accessToken', token);
        localStorage.setItem('username', username);
    };

    const logout = () => {
        setAuthState({ token: null, username: null });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}; 