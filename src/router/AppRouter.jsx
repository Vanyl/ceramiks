import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";

function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </HashRouter>
    )
}

export default AppRouter;