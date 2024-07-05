import { ItemsContext } from "../context/itemsContext";
import { CollectionsContext } from "../context/collectionsContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const Collections = () => {
    const { allItems, allTypes } = useContext(ItemsContext)
    const { allCollections, isLoading } = useContext(CollectionsContext)
    const { collection } = useParams();

    console.log(collection)


    const collectionData = allItems.filter((e) => e.collection?.name.toLowerCase() === collection || e?.product_type.toLowerCase() === collection)
    console.log(collectionData)

    // const collectionId = null; // recup l'id de collection de l'url
    // const newCollectionItems = allItems.filter(e => e.collectionId === collectionId);

    const renderItems = () => {
        if (collection === "all") {
            return allItems?.map((item) => (
                <li key={item.id}>{item.name}</li>
            ));
        } else {
            return collectionData?.map((item) => (
                <li key={item.id}>{item.name}</li>
            ));
        }
    };
    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul style={{marginTop:'500px'}}>
                    {renderItems()}
                </ul>
            )}
        </>
    )
}

export default Collections;