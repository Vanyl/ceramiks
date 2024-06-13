import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Footer from "../components/Footer.jsx"

function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer/>
        </HashRouter>
    )
}

export default AppRouter;