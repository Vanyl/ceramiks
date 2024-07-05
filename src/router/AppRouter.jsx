import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Profile from '../pages/Profile.jsx'
import Register from "../components/Register.jsx";
import Login from "../components/Login.jsx";
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Item from "../components/Item.jsx";
import SearchResults from '../pages/SearchResults.jsx'
import AuthProvider from "../context/authContext.jsx";
import ItemsProvider from "../context/itemsContext.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import Collections from "../pages/Collections.jsx";



function AppRouter() {
    return (
        <>  
            <BrowserRouter>
                <AuthProvider>
                    <ItemsProvider>
                        <Navbar />
                        <ScrollToTop />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/my-account" element={<Profile />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/products/:product" element={<Item/>} />
                            <Route path="/search-results" element={<SearchResults/>}/>
                            <Route path="/collections/:product" element ={<Collections />} />
                        </Routes>
                    </ItemsProvider>
                </AuthProvider>
                <Footer/>
            </BrowserRouter>
        </>
    )
}

export default AppRouter;