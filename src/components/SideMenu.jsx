import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { IoMdClose } from "react-icons/io";
import '../sass/side-menu.scss'
import { useClickAway } from "@uidotdev/usehooks";
import { useAuth } from '../context/authContext.jsx';
import { ItemsContext } from "../context/itemsContext";

const SideMenu = ({ isOpen, setIsOpen }) => {
    const { authState, logout } = useAuth();
    const [isOpenBtn, setIsOpenBtn] = useState(false)
    const { allItems, allTypes } = useContext(ItemsContext)

    const ref = useClickAway(() => {
        setIsOpen(false);
    });

    const toggleSideMenu = () => {
        setIsOpen(!isOpen)
    }

    const toggleMoreBtn = () => {
        setIsOpenBtn(!isOpenBtn)
    }

    return (
        <>
            {/* {isOpen ? */}
            <div ref={ref} className={`container-side-menu ${isOpen ? 'open' : 'closed'}`}>
                <div className="header-side-menu">
                    <span onClick={toggleSideMenu} >{isOpen ? <IoMdClose className="closeBtn" /> : ''}</span>
                </div>
                <nav id="nav-side-menu">
                    <ul className="menu-list">
                        <li><Link to='/' className='links'>Home</Link></li>
                        <li><Link to='/collections/:product' className='links'>New collection</Link></li>
                        <div className="container-products-more">
                            <li>Products
                            </li>
                            <button
                                onClick={toggleMoreBtn}
                                className={`more-btn ${isOpenBtn ? 'rotate open' : 'rotate'}`}
                            >
                                {isOpenBtn ? '-' : '+'}
                            </button>
                        </div>
                        {isOpenBtn && <ul className="all-products">
                            <li className={`product-item ${isOpenBtn ? 'show' : ''}`}><Link to='/collections/:product' className='links'>All products</Link></li>
                            {
                                allTypes
                                .sort((a, b) => a.product_type.localeCompare(b.product_type))
                                    .map((type, i) => (
                                        <li key={i} className={`product-item ${isOpenBtn ? 'show' : ''}`}><Link to={`/collections/${type.product_type.toLowerCase()}`} className='links'>{type.product_type}</Link></li>
                                    ))
                            }
                        </ul>
                        }
                        {!authState.token ?
                            <>
                                <li><Link to='/login' className='links'>Account</Link></li>
                            </>
                            : <li><Link to='/' className='links' onClick={logout}>LOGOUT</Link></li>
                        }
                    </ul>
                </nav>
            </div>
            {/* : ''} */}
        </>
    )
}

export default SideMenu;