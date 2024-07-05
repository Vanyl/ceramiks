import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [authState, setAuthState] = useState({
        token: null,
        username: null,
        id: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const username = localStorage.getItem('username');
        const id = localStorage.getItem('id');
        if (token && username && id) {
            setAuthState({ token, username, id });
        }
    }, []);

    const login = (token, username, id) => {
        setAuthState({ token, username, id });
        localStorage.setItem('accessToken', token);
        localStorage.setItem('username', username);
        localStorage.setItem('id', id);
    };

    const logout = () => {
        setAuthState({ token: null, username: null, id: null });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
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