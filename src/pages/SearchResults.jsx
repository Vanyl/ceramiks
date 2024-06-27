import { useEffect, useState } from "react";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import '../sass/searchresults.scss'

const SearchResults = () => {
    const [results, setResults] = useState([]);
    let [searchParams] = useSearchParams();
    const query = searchParams.get('q')

    const getItems = async () => {
        try {
            const response = await fetch(`https://ecommerce-website3333-593ff35538d5.herokuapp.com/api/items`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                console.log(searchParams)
                const itemsData = await response.json();
                console.log(itemsData); 

                const matchingResults  = itemsData.filter((item) => item?.name && item.name.toLowerCase().includes(query) || query && item?.product_type && item.product_type.toLowerCase().includes(query))
                console.log(matchingResults)
                setResults(matchingResults)
            } else {
                console.error('Error while getting all items:', result.statusText);
            }
        } catch (error) {
            console.error('Error while getting all items:', error);
        }
    };

    useEffect(() => {
        getItems();
    }, [query]);

    return (
        <>
            <div className='search-results-container'>
                <h1>Search</h1>
                <p className="results-info">{results.length} results for "{query}"</p>
                <div className="search-results-products">
                    {results?.map((result) => (
                        <div key={result.id} className="search-results-product">
                            <Link to={`/products/${result.name}`}>
                            <img
                                className="search-results-img"
                                src={result.Items_img[0].image_url}
                                alt={result.name}
                            />
                            </Link>
                            <Link to={`/products/${result.name}`} className="search-results-links">
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

export default SearchResults;