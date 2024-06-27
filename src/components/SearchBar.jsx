import { IoSearchSharp } from "react-icons/io5"
import { IoMdClose } from "react-icons/io";
import { forwardRef, useState, useEffect } from "react";
import SearchBarResults from "./SearchBarResults";
import '../sass/searchbar.scss'

const SearchBar = forwardRef(({ handleToggle }, ref) => {
    const [input, setInput] = useState("")
    const [showPartSearch, setShowPartSearch] = useState(false)
    const [results, setResults] = useState([])

    const getItems = async (value) => {
        try {
            const response = await fetch(`https://ecommerce-website3333-593ff35538d5.herokuapp.com/api/items`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const itemsData = await response.json();
                const results = itemsData.filter((item) => {
                    return value && item && item.name && item.name.toLowerCase().includes(value) || value && item && item.product_type && item.product_type.toLowerCase().includes(value)
                });
                setResults(results)

            } else {
                console.error('Error while getting all items:', result.statusText);
            }
        } catch (error) {
            console.error('Error while getting all items:', error);
        }
    };

    useEffect(() => {
        getItems();
    }, []);

    const handleChange = (value) => {
        setInput(value)
        getItems(value)
        setShowPartSearch(true)
    }


    return (
        <div className='overlay'>
            <div className='search-container' ref={ref}>
                <div className='search-div'>
                    <IoSearchSharp className='search-icon' />
                    <input
                        type="text"
                        className='search-input'
                        placeholder='SEARCH...'
                        value={input}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    <IoMdClose className='close-search' onClick={handleToggle} />
                </div>
                {showPartSearch ? (
                    <div className="search-bar-results">
                        <SearchBarResults results={results}/>
                    </div>
                ) : (
                    null
                )}
            </div>
        </div>
    )
})

export default SearchBar;