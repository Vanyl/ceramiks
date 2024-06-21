import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Profile from '../pages/Profile.jsx'
import Register from "../components/Register.jsx";
import Login from "../components/Login.jsx";
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import AuthProvider from "../context/authContext.jsx";



function AppRouter() {
    return (
        <>  
            <BrowserRouter>
                <AuthProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/my-account" element={<Profile />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </AuthProvider>
                <Footer/>
            </BrowserRouter>
        </>
    )
}

export default AppRouter;