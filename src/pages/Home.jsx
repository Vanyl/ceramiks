import { useState } from "react";
//import './sass/style.scss'
import Navbar from '../components/Navbar.jsx'
import SideMenu from "../components/SideMenu";
import '../sass/home.scss'


function Home() {

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const openSideMenu = () => {
        console.log(isSideMenuOpen)
        setIsSideMenuOpen(!isSideMenuOpen)
    }
    return (
        <div className='home-container'>
            <Navbar />
            <div>
                <button onClick={openSideMenu}>Open Side Menu</button>
                <SideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
            </div>
        </div>
    )
}

export default Home;