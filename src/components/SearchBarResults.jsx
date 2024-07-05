import { Link } from "react-router-dom";
import { useState, useEffect } from "react";



const SearchBarResults = ({ results, searchQuery, handleToggle }) => {
    const [showResults, setShowResult] = useState(false)

    useEffect(() => {
        if (results.length > 0) {
            setShowResult(true);
        } else {
            setShowResult(false);
        }
    }, [results]);

    return (
        <>
            <div className='search-bar-results-container'>
                {showResults && (
                    <div className="search-bar-results-info">
                        <span>{results.length} results</span>
                        <Link to={`/search-results?q=${searchQuery}`} onClick={handleToggle} className="search-bar-links">view all</Link>
                    </div>
                )}
                <div className="search-bar-products">
                    {results.slice(0, 3).map((result) => (
                        <div key={result.id} className="search-bar-product">
                            <Link to={`/products/${result.name}`}>
                            <img
                                className="search-bar-results-img"
                                src={result.Items_img[0].image_url}
                                alt={result.name}
                                onMouseEnter={(e) => (e.currentTarget.src = result.Items_img[1].image_url)}
                                onMouseLeave={(e) => (e.currentTarget.src = result.Items_img[0].image_url)}
                            />
                            </Link>
                            <Link to={`/products/${result.name}`} onClick={handleToggle} className="search-bar-links">
                                <p>{result.name}</p>
                                <p>€ {(result.price / 100).toFixed(2)}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SearchBarResults;