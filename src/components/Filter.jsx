import { useState } from "react"
import { Link } from "react-router-dom"
import { IoMdClose } from "react-icons/io";
import { useClickAway } from "@uidotdev/usehooks";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import '../sass/filter.scss'

//enum
const FILTER_IDS = {
    PRICE: 1,
    AVAILABILITY: 2,
    PRODUCT_TYPE: 3,
    COLLECTION: 4
}

const Filter = ({ isOpen, setIsOpen }) => {
    const [expandedFilters, setExpandedFilters] = useState([]);
    const [sliderValues, setSliderValues] = useState([0, 100]);

    const ref = useClickAway(() => {
        setIsOpen(false);
    });

    const toggleSideMenu = () => {
        setIsOpen(false)
    }

    //ouvrir +/-
    const toggleFilterExpansion = (id) => {
        let currentExpandedFilters = [...expandedFilters];
        const expandedIdIndex = currentExpandedFilters.findIndex((filterId) => filterId === id);
        if (expandedIdIndex >= 0) { //trouve index
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

    const handleSliderChange = (values) => {
        setSliderValues(values);
    };

    return (
        <>
            <div ref={ref} id='container-filter-menu' className={`${isOpen ? 'open' : 'closed'}`}>
                <div className="filter-side-menu">
                    <span onClick={toggleSideMenu} ><IoMdClose className="closeBtn" /></span>
                    <h2>FILTER</h2>
                </div>
                <div className="slider-container">
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
                        {isFilterExpanded(FILTER_IDS.PRICE) &&
                            <>
                                <RangeSlider
                                    className={`${isFilterExpanded(FILTER_IDS.PRICE) ? 'show' : ''}`}
                                    id="slider"
                                    min={0}
                                    max={100}
                                    step={5}
                                    defaultValue={sliderValues}
                                    onInput={handleSliderChange}
                                />
                                <div className="input-slider-container">
                                    <div className="input-range-min">
                                        <span>€</span>
                                        <input
                                            className="input-slider"
                                            type="number"
                                            value={sliderValues[0]}
                                            onChange={(e) => setSliderValues([+e.target.value, sliderValues[1]])}
                                        />
                                    </div>
                                    <span>-</span>
                                    <div className="input-range-max">
                                        <span>€</span>
                                        <input
                                            className="input-slider"
                                            type="number"
                                            value={sliderValues[1]}
                                            onChange={(e) => setSliderValues([sliderValues[0], +e.target.value])}
                                            placeholder="€"
                                        />
                                    </div>
                                </div>
                            </>
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
                    <button className="btn-results">SEE RESULTS</button>
                </div>
            </div>
        </>
    )
}

export default Filter;