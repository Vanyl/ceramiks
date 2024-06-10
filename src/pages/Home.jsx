import { useState } from "react";
//import './sass/style.scss'
import SideMenu from "../components/SideMenu";

function Home() {

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const openSideMenu = () => {
        console.log(isSideMenuOpen)
        setIsSideMenuOpen(!isSideMenuOpen)
    }
    return (
        <div>
            <button onClick={openSideMenu}>Open Side Menu</button>
            <SideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
        </div>
    )
}

export default Home;