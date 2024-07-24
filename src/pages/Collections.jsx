import { ItemsContext } from "../context/itemsContext";
import { CollectionsContext } from "../context/collectionsContext";
import { useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import '../sass/collections.scss'

const Collections = () => {
    const { allItems, allTypes } = useContext(ItemsContext)
    const { allCollections, isLoading } = useContext(CollectionsContext)
    const { collection } = useParams();
    const [displayedCollections, setDisplayedCollections] = useState(5)


    const getItemsByCollection = () =>
        allItems.filter((e) => e.collection?.name.toLowerCase() === collection || e?.product_type.toLowerCase() === collection)
    const currentItems = collection === 'all' ? allItems : getItemsByCollection();


    const loadMoreItems = () => {
        setDisplayedCollections(displayedCollections + 10);
    };

    const renderItems = () => {
        // return currentItems?.map((item) =>
        return currentItems.slice(0, displayedCollections).map((item) => (
            <div key={item.id} className="collections-product">
                <Link to={`/products/${item.name}`}>
                    <img
                        className="collections-img"
                        src={item.Items_img[0].image_url}
                        alt={item.name}
                        onMouseEnter={(e) => (e.currentTarget.src = item.Items_img[1].image_url)}
                        onMouseLeave={(e) => (e.currentTarget.src = item.Items_img[0].image_url)}
                    />
                </Link>
                <Link to={`/products/${item.name}`} className="collections-links">
                    <p>{item.name}</p>
                    <p>€ {(item.price / 100).toFixed(2)}</p>
                </Link>
            </div>
        ));
    };
    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className='collections-container'>
                        <h1>{collection}</h1>
                        {/* <div className="filter-sort">
                            <span onClick={openFilterMenu}>FILTER</span>
                            <Filter isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} updateFilters={setFilters} filteredItems={results} />
                            <Sort />
                        </div> */}
                        <div className="collections-products">
                            {renderItems()}
                        </div>
                        {displayedCollections < currentItems.length && (
                            <button className='btn-loadMore' onClick={loadMoreItems}>Load More</button>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default Collections;