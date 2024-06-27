import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { MdPersonOutline } from "react-icons/md"
import { IoSearchSharp } from "react-icons/io5"
import { LuShoppingBasket } from "react-icons/lu"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoMdClose } from "react-icons/io";
import SideMenu from "./SideMenu";
import '../sass/navbar.scss'
import { useClickAway } from "@uidotdev/usehooks";
import { useAuth } from '../context/authContext.jsx';
import { VscAccount } from "react-icons/vsc";
import { TbLogout } from "react-icons/tb";
import Basket from '../components/Basket.jsx';



function Navbar() {
    const { authState, logout } = useAuth();
    const [isToggled, setToggled] = useState(false);
    const handleToggle = () => {
        setToggled(!isToggled);
    }

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const openSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    }

    const [isBasketOpen, setBasketOpen] = useState(false);
    const handleBasketToggle = () => {
        setBasketOpen(!isBasketOpen);
    };

    const location = useLocation();
    //const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
    const isAuthPage = location.pathname !== '/' && location.pathname !== '/my-account';


    const [isScrolled, setScrolled] = useState(false);

    const ref = useClickAway(() => {
        console.log('ref')
        setToggled(false);
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        /* return () => {
            window.removeEventListener('scroll', handleScroll);
        };  */
    }, []);

    useEffect(() => {
        document.body.style.overflow = isBasketOpen || isToggled ? 'hidden' : 'auto';
    }, [isBasketOpen, isToggled]);


    return (
        <>
            <div className={`navbar ${isToggled || isAuthPage || isScrolled ? 'active' : ''}`}>
                <div className='hamburger-menu'>
                    <button className='hamburger-button' onClick={openSideMenu}><GiHamburgerMenu className='hamburger-btn' /></button>
                </div>
                <div className='title'>
                    <Link to="/">Ceramics.</Link>
                </div>
                <div className='right-menu'>
                    {authState.token ? (
                        <>
                            <Link to="/" className='account' onClick={logout}>
                                <TbLogout />
                            </Link>
                            <Link to="/my-account" className='account'>
                                <VscAccount />
                            </Link>
                        </>
                    ) : (
                        <Link to="/login" className='account'>
                            <MdPersonOutline />
                        </Link>
                    )}
                    <Link to="#" className='search' onClick={handleToggle}>
                        <IoSearchSharp />
                    </Link>
                    <Link to="#" className='basket' onClick={handleBasketToggle}>
                        <LuShoppingBasket />
                    </Link>
                </div>
            </div>
            {isToggled ?
                <div className='overlay-nav'>
                    <div className='search-container' ref={ref}>
                        <div className='search-div'>
                            <IoSearchSharp className='search-icon' />
                            <input type="text" className='search-input' placeholder='SEARCH...' />
                            <IoMdClose className='close-search' onClick={handleToggle} />
                        </div>
                    </div>
                </div>
                : ''}
            <SideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
            {isBasketOpen ?
                <div className='overlay' onClick={handleBasketToggle}>
                    <Basket isBasketOpen={isBasketOpen} setIsBasketOpen={setBasketOpen} />
                </div>
            : ''}
        </>
    )
}

export default Navbar;