import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Filter from "../components/Filter";
import Sort from "../components/Sort";
import '../sass/searchresults.scss'

const SearchResults = () => {
    const [results, setResults] = useState([]);
    let [searchParams] = useSearchParams();
    const query = searchParams.get('q')

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    //toggle
    const openFilterMenu = () => {
        setIsFilterOpen(!isFilterOpen)
    }

    const getItems = async () => {
        try {
            const response = await fetch(`https://ecommerce-website3333-593ff35538d5.herokuapp.com/api/items`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const itemsData = await response.json();
                // const matchingResults = itemsData.Objets.filter((item) => item?.name && item.name.toLowerCase().includes(query) || query && item?.product_type && item.product_type.toLowerCase().includes(query)) || (query && item?.collection?.name && item.collection.name.toLowerCase().includes(query))
                const matchingResults = itemsData.Objets.filter((item) => {
                    const itemNameMatches = item?.name && item.name.toLowerCase().includes(query);
                    const productTypeMatches = query && item?.product_type && item.product_type.toLowerCase().includes(query);
                    const collectionNameMatches = query && item?.collection?.name && item.collection.name.toLowerCase().includes(query);
                    return itemNameMatches || productTypeMatches || collectionNameMatches;
                });
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
                <div className="filter-sort">
                    <span onClick={openFilterMenu}>FILTER</span>
                    {/* {isFilterOpen && <Filter isOpen={isFilterOpen} setIsOpen={setIsFilterOpen}/>} */}
                    {/* <Filter isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} /> */}
                    <Sort />
                </div>
                <div className="search-results-products">
                    {results?.map((result) => (
                        <div key={result.id} className="search-results-product">
                            <Link to={`/products/${result.name}`}>
                                <img
                                    className="search-results-img"
                                    src={result.Items_img[0].image_url}
                                    alt={result.name}
                                    onMouseEnter={(e) => (e.currentTarget.src = result.Items_img[1].image_url)}
                                    onMouseLeave={(e) => (e.currentTarget.src = result.Items_img[0].image_url)}
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