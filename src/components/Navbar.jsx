import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { GoPerson } from "react-icons/go";
import { MdPersonOutline } from "react-icons/md"
import { IoSearchSharp } from "react-icons/io5"
import { LuShoppingBasket } from "react-icons/lu"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoMdClose } from "react-icons/io";
import SideMenu from "./SideMenu";
import '../sass/navbar.scss'


function Navbar() {

    const [isToggled, setToggled] = useState(false);
    const handleToggle = () => {
        setToggled(!isToggled);
    }

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const openSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen)
    }
    return (
        <>
            <div className={`navbar ${isToggled ? 'active' : ''}`}>
                <div className='hamburger-menu'>
                    <button className='hamburger-button' onClick={openSideMenu}><GiHamburgerMenu className='hamburger-btn' /></button>
                </div>
                <div className='title'>
                    <Link to="/">Ceramics.</Link>
                </div>
                <div className='rigth-menu'>   
                    <Link to="/login"  className='account'>
                        <MdPersonOutline />
                    </Link>
                    <Link to="#" className='search' onClick={handleToggle}>
                        <IoSearchSharp />
                    </Link>
                    <Link to="#" className='basket'>
                        <LuShoppingBasket />
                    </Link>
                </div>
            </div>
            {isToggled ?
                <div className='search-container'>
                    <div className='search-div'>
                        <IoSearchSharp className='search-icon' />
                        <input type="text" className='search-input' placeholder='SEARCH...' />
                        <IoMdClose className='close-search' onClick={handleToggle} />
                    </div>
                </div>
                : ''}
            <SideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />

        </>
    )
}

export default Navbar;