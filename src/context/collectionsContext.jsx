import React, { createContext, useState, useEffect } from 'react';

export const CollectionsContext = createContext();

const CollectionsProvider = ({ children }) => {
    const [allCollections, setAllCollections] = useState([])

    const fetchCollections = async () => {
        try {
            const response = await fetch('https://ecommerce-website3333-593ff35538d5.herokuapp.com/api/collections', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const collectionsData = await response.json();
                setAllCollections(collectionsData);
            } else {
                console.error('Error while getting all items:', response.statusText);
            }
        } catch (error) {
            console.error('Error while getting all items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, [])

    return (
        <CollectionsContext.Provider value={{allCollections}}>
            {children}
        </ CollectionsContext.Provider>

    )
}

export default CollectionsProvider;