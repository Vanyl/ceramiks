import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Register from "../components/Register.jsx";
import Login from "../components/Login.jsx";
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'


function AppRouter() {
    return (
        <>  
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    )
}

export default AppRouter;