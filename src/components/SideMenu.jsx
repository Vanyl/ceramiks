import { useState } from "react"
import { Link } from "react-router-dom"
import '../sass/side-menu.scss'

const SideMenu = ({ isOpen, setIsOpen }) => {
    const [isOpenBtn, setIsOpenBtn] = useState(false)
    
    const toggleSideMenu = () => {
        console.log('toggle')
        setIsOpen(!isOpen)
    }

    const toggleMoreBtn = () => {
        setIsOpenBtn(!isOpenBtn)
    }

    return (
        <>  <div className={`container-nav $isOpen ? 'open' : 'closed'`}>
            <nav id="nav-side-menu" >
                <span onClick={toggleSideMenu} className="closeBtn">{isOpen ? 'x' : 'o'}</span>
                {isOpen &&
                    <ul className="menu-list">
                        <li><Link to='/' className='links'>Home</Link></li>
                        {/* <hr/> */}
                        <li><Link to='#'className='links'>New collection</Link></li>
                        {/* <hr/> */}
                        <li>Products 
                            <button 
                                onClick={toggleMoreBtn} 
                                className={`more-btn ${isOpenBtn ? 'rotate open' : 'rotate'}`}
                            >
                                {isOpenBtn ? '-' : '+'}
                            </button>
                        </li>
                        {isOpenBtn && <ul className="all-products">
                            <li className={`product-item ${isOpenBtn ? 'show' : ''}`}><Link to='#'className='links'>All products</Link></li>
                            <li className={`product-item ${isOpenBtn ? 'show' : ''}`}><Link to='#'className='links'>Plates</Link></li>
                            <li className={`product-item ${isOpenBtn ? 'show' : ''}`}><Link to='#'className='links'>Bowls</Link></li>
                            <li className={`product-item ${isOpenBtn ? 'show' : ''}`}><Link to='#'className='links'>Candles-Candlesticks</Link></li>
                            <li className={`product-item ${isOpenBtn ? 'show' : ''}`}><Link to='#'className='links'>Mugs and cups</Link></li>
                            <li className={`product-item ${isOpenBtn ? 'show' : ''}`}><Link to='#'className='links'>Vases</Link></li>
                        </ul>
                        }
                        {/* <hr/> */}
                        <li><Link to='#'className='links'>Account</Link></li>
                    </ul>
                }
            </nav>
        </div>
        </>
    )
}

export default SideMenu;