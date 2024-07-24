import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    let authToken = localStorage.getItem('accessToken');
    const [messageSession, setMessageSession] = useState(null);
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
        const is_admin = localStorage.getItem('is_admin') === 'true';
        if (token && username && id) {
            setAuthState({ token, username, id, is_admin});
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
        localStorage.setItem('is_admin', is_admin.toString());
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
        localStorage.removeItem('is_admin')
    };

    const autoLogout = () => {
        setMessageSession('');
        setTimeout(() => {
            logout();
            setMessageSession("Session expired, please reconnect again !");
            navigate("/");
        }, 10800000); //30600  //10800000 = 3 hours
        //setMessageSession("Session expired, please reconnect again !");
         setTimeout(() => {
            setMessageSession('');
        }, 50000); 
    }

    useEffect(() => {
        if(authToken) {
            autoLogout();
        }
    }, [authToken]);



    return (
        <AuthContext.Provider value={{ authState, login, logout, messageSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}; 
