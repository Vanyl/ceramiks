import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [authState, setAuthState] = useState({
        token: null,
        username: null,
        id: null,
        is_admin : false
    });

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const username = localStorage.getItem('username');
        const id = localStorage.getItem('id');
        const is_admin = localStorage.getItem('is_admin')
        if (token && username && id) {
            setAuthState({ token, username, id, is_admin });
        }
    }, []);

    const login = (token, username, id, adress, first_name, last_name, email, is_admin) => {
        setAuthState({ token, username, id, is_admin });
        localStorage.setItem('accessToken', token);
        localStorage.setItem('username', username);
        localStorage.setItem('id', id);
        localStorage.setItem('email', email);
        localStorage.setItem('adress', adress);
        localStorage.setItem('firstname', first_name);
        localStorage.setItem('lastname', last_name);
        //autrement?
        localStorage.setItem('is_admin', is_admin);
    };

    const logout = () => {
        setAuthState({ token: null, username: null, id: null, first_name: null, last_name: null, email: null, adress: null, is_admin: false });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        localStorage.removeItem('id');
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
        localStorage.removeItem('email');
        localStorage.removeItem('adress');
        localStorage.removeItem('is_admin');
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