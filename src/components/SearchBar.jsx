import { IoSearchSharp } from "react-icons/io5"
import { IoMdClose } from "react-icons/io";
import { forwardRef } from "react";

const SearchBar = forwardRef(({ handleToggle }, ref) => {

    return (
        <div className='overlay'>
            <div className='search-container' ref={ref}>
                <div className='search-div'>
                    <IoSearchSharp className='search-icon' />
                    <input type="text" className='search-input' placeholder='SEARCH...' />
                    <IoMdClose className='close-search' onClick={handleToggle} />
                </div>
            </div>
        </div>
    )
})

export default SearchBar;