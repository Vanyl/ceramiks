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
import CollectionsProvider from "../context/collectionsContext.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import Collections from "../pages/Collections.jsx";
import CheckoutForm from "../pages/CheckoutForm.jsx";
import Success from "../pages/Success.jsx";
import Contact from "../pages/Contact.jsx";
import AdminDashBoard from "../pages/AdminDashBoard.jsx";



function AppRouter() {
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <ItemsProvider>
                        <CollectionsProvider>
                            <Navbar />
                            <ScrollToTop />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/my-account" element={<Profile />} />
                                <Route path="/admin" element={<AdminDashBoard/>} />
                                <Route path="/register" element={<Register />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/products/:product" element={<Item />} />
                                <Route path="/search-results" element={<SearchResults />} />
                                <Route path="/collections/:collection" element={<Collections />} />
                                <Route path="/checkout-form" element={<CheckoutForm/>}/>
                                <Route path="/success" element={<Success/>}/>
                                <Route path="/contact-us" element={<Contact />}/>
                            </Routes>
                        </CollectionsProvider>
                    </ItemsProvider>
                </AuthProvider>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default AppRouter;