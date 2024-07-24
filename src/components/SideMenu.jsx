import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { IoMdClose } from "react-icons/io";
import '../sass/side-menu.scss'
import { useClickAway } from "@uidotdev/usehooks";
import { useAuth } from '../context/authContext.jsx';
import { ItemsContext } from "../context/itemsContext";
import { CollectionsContext } from "../context/collectionsContext.jsx";

const SideMenu = ({ isOpen, setIsOpen }) => {
    const { authState, logout } = useAuth();
    const [isOpenBtn, setIsOpenBtn] = useState(false)
    const { allItems, allTypes } = useContext(ItemsContext)
    const { allCollections } = useContext(CollectionsContext)

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
            <div ref={ref} className={`container-side-menu ${isOpen ? 'open' : 'closed'}`}>
                <div className="header-side-menu">
                    <span onClick={toggleSideMenu} >{isOpen ? <IoMdClose className="closeBtn" /> : ''}</span>
                </div>
                <nav id="nav-side-menu">
                    <ul className="menu-list">
                        <li><Link to='/' className='links'>Home</Link></li>

                        <li><Link to={`/collections/${allCollections[0]?.name.toLowerCase()}`} className='links'>New collection</Link></li>
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
                            <li className={`product-item ${isOpenBtn ? 'show' : ''}`}><Link to={`/collections/all`} className='links'>All products</Link></li>
                            {
                                allTypes
                                    .sort((a, b) => a.product_type.localeCompare(b.product_type))
                                    .map((type, i) => (
                                        <li key={i} className={`product-item ${isOpenBtn ? 'show' : ''}`}><Link to={`/collections/${type.product_type.toLowerCase()}`} className='links'>{type.product_type}</Link></li>
                                    ))
                            }
                        </ul>
                        }
                        <li style={{borderBottom: '1px solid rgb(189, 187, 187)'}}><Link to='/contact-us' className='links'>Contact us</Link></li>

                            {!authState.token ? (
                                <li><Link to='/login' className='links'>LOGIN</Link></li>
                            ) : (
                                <>
                                    {authState.is_admin ? (
                                        <li style={{borderBottom: '1px solid rgb(189, 187, 187)'}}>
                                            <Link to="/admin" className='links'>
                                                dashboard admin
                                            </Link>
                                        </li>
                                    ) : (
                                        <li style={{borderBottom: '1px solid rgb(189, 187, 187)'}}>
                                            <Link to="/my-account" className='links'>
                                                my account
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <Link to='/' className='links' onClick={logout}>LOGOUT</Link>
                                    </li>
                                </>
                            )}
                        
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default SideMenu;