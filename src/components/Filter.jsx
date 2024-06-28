import { useState } from "react"
import { Link } from "react-router-dom"
import { IoMdClose } from "react-icons/io";
import { useClickAway } from "@uidotdev/usehooks";
import '../sass/side-menu.scss'

//enum
const FILTER_IDS = {
    PRICE: 1,
    AVAILABILITY: 2,
    PRODUCT_TYPE: 3,
    COLLECTION: 4
}

const Filter = ({isOpen, setIsOpen}) => {
    const [expandedFilters, setExpandedFilters] = useState([]);
 

    // const ref = useClickAway(() => {
    //     setIsOpen(false);
    // });

    const toggleSideMenu = () => {
        setIsOpen(false)
    }

    //ouvrir +/-
    const toggleFilterExpansion = (id) => {
        let currentExpandedFilters = [...expandedFilters];
        const expandedIdIndex = currentExpandedFilters.findIndex((filterId) => filterId === id);
        if(expandedIdIndex >= 0) { //trouve index
            currentExpandedFilters.splice(expandedIdIndex, 1);
        } else { //si pa sindex dans tableau, l'ajouter
            currentExpandedFilters.push(id)
        }
        //update state
        setExpandedFilters(currentExpandedFilters);
    }

    const isFilterExpanded = (id) => {
        return expandedFilters.find((filterId) => filterId === id);
    }

    return (
        <>
            {/* <div>FILTER</div> */}
            <div className={`container-side-menu ${isOpen ? 'open' : 'closed'}`}>
                <div className="header-side-menu">
                    <span onClick={toggleSideMenu} >{isOpen ? <IoMdClose className="closeBtn" /> : ''}</span>
                </div>
                <nav id="nav-side-menu">
                    <ul className="menu-list">
                        <div className="container-products-more">
                            <li>Price</li>
                            <button
                                onClick={() => toggleFilterExpansion(FILTER_IDS.PRICE)}
                                className={`more-btn ${isFilterExpanded(FILTER_IDS.PRICE) ? 'rotate open' : 'rotate'}`}
                            >
                                {isFilterExpanded(FILTER_IDS.PRICE) ? '-' : '+'}
                            </button>
                        </div>
                        {isFilterExpanded(FILTER_IDS.PRICE) && <ul className="all-products">
                            <li className={`product-item ${isFilterExpanded(FILTER_IDS.PRICE) ? 'show' : ''}`}>bar prix</li>
                        </ul>
                        }
                        <div className="container-products-more">
                            <li>Availability</li>
                            <button
                                onClick={() => toggleFilterExpansion(FILTER_IDS.AVAILABILITY)}
                                className={`more-btn ${isFilterExpanded(FILTER_IDS.AVAILABILITY) ? 'rotate open' : 'rotate'}`}
                            >
                                {isFilterExpanded(FILTER_IDS.AVAILABILITY) ? '-' : '+'}
                            </button>
                        </div>
                        {isFilterExpanded(FILTER_IDS.AVAILABILITY) && <ul className="all-products">
                            <li className={`product-item ${isFilterExpanded(FILTER_IDS.AVAILABILITY) ? 'show' : ''}`}>In stock (number)</li>
                            <li className={`product-item ${isFilterExpanded(FILTER_IDS.AVAILABILITY) ? 'show' : ''}`}>Out of stock (number)</li>
                    
                        </ul>
                        }
                        <div className="container-products-more">
                            <li>Product type</li>
                            <button
                                onClick={() => toggleFilterExpansion(FILTER_IDS.PRODUCT_TYPE)}
                                className={`more-btn ${isFilterExpanded(FILTER_IDS.PRODUCT_TYPE) ? 'rotate open' : 'rotate'}`}
                            >
                                {isFilterExpanded(FILTER_IDS.PRODUCT_TYPE) ? '-' : '+'}
                            </button>
                        </div>
                        {isFilterExpanded(FILTER_IDS.PRODUCT_TYPE) && <ul className="all-products">
                            <li className={`product-item ${isFilterExpanded(FILTER_IDS.PRODUCT_TYPE) ? 'show' : ''}`}><Link to='#' className='links'>type product (number)</Link></li>
                        </ul>
                        }
                        <div className="container-products-more">
                            <li>Collection</li>
                            <button
                                onClick={() => toggleFilterExpansion(FILTER_IDS.COLLECTION)}
                                className={`more-btn ${isFilterExpanded(FILTER_IDS.COLLECTION) ? 'rotate open' : 'rotate'}`}
                            >
                                {isFilterExpanded(FILTER_IDS.COLLECTION) ? '-' : '+'}
                            </button>
                        </div>
                        {isFilterExpanded(FILTER_IDS.COLLECTION) && <ul className="all-products">
                            <li className={`product-item ${isFilterExpanded(FILTER_IDS.COLLECTION) ? 'show' : ''}`}><Link to='#' className='links'>nom collection (number products)</Link></li>
                        </ul>
                        }
                    </ul>
                </nav>
            </div>
        </>
    )
}

export default Filter;