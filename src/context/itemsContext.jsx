import React, { createContext, useState, useEffect } from 'react';

export const ItemsContext = createContext();

const ItemsProvider = ({ children }) => {

    const [allItems, setAllItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true); 

    const fetchItems = async () => {
        try {
            const response = await fetch('https://ecommerce-website3333-593ff35538d5.herokuapp.com/api/items', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const itemsData = await response.json();
                setAllItems(itemsData);
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
        fetchItems();
    }, []);


    const addItemToBasket = (item, quantity = 1) => {
       /*  let isExist = false;
        cartItems.map((cartItem) => {cartItem
            if (item.id === cartItem.id) {
                isExist = true;
            }
        });

        if(isExist) {
            console.log('item already in the cart !');
           // quantity = cartItems.quantity + quantity;
        }

        setCartItems([...cartItems, {...item, quantity: cartItems.quantity + quantity}]); */

        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + quantity }
                        : cartItem
                );
            }
            return [...prevItems, { ...item, quantity }];
        });
    };

    const updateItemQuantity = (itemId, quantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity } : item
            )
        );
    };

    /* const addItemToBasket = (item, quantity = 1) => {
        setCartItems(oldItems => {
            const existingItem = oldItems.find(cartItem => cartItem.id === item.id);
            if(existingItem) {
                return oldItems.map(cartItem => 
                    cartItem.id === item.id 
                    ? { ...cartItem, quantity: cartItem.quantity + quantity }
                    : cartItem
                );
            }
            return [...oldItems, { ...item, quantity }];
        });
    } */


    const removeItemFromBasket = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };


    return (
        <ItemsContext.Provider value={{ allItems, cartItems, loading, addItemToBasket, updateItemQuantity, removeItemFromBasket }}>
            {children}
        </ItemsContext.Provider>
    );
}

export default ItemsProvider;
