import { ItemsContext } from "../context/itemsContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";

const Collections = () => {
    const { allItems, allTypes } = useContext(ItemsContext)
    const { product } = useParams();


    return(
        <>
        </>
    )
}

export default Collections