import { Link } from "react-router-dom";
import { useState, useEffect } from "react";



const SearchBarResults = ({ results, searchQuery }) => {
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
                        <Link to={`/search-results?q=${searchQuery}`}  className="search-bar-links">view all</Link>
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
                            />
                            </Link>
                            <Link to={`/products/${result.name}`} className="search-bar-links">
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