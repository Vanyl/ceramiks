import React, { createContext, useState, useEffect } from 'react';

export const ItemsContext = createContext();

const ItemsProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    //Get cart items from localStorage when the component (basket)  is loaded (if there is something in localStorage)
    useEffect(() => {
        const savedCartItems = localStorage.getItem('allCartItems');
        if (savedCartItems) {
            setCartItems(JSON.parse(savedCartItems));
        }
    }, []);

    //Save cart items in localStorage whenever cartItems changes
    useEffect(() => {
        if (cartItems.length > 0) {
            localStorage.setItem('allCartItems', JSON.stringify(cartItems));
        } /* else {
            localStorage.removeItem('allCartItems');
        } */
    }, [cartItems]);

    const addItemToBasket = (item, quantity = 1) => {
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

    const removeItemFromBasket = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        localStorage.removeItem('allCartItems');
    };


    return (
        <ItemsContext.Provider value={{ cartItems, addItemToBasket, updateItemQuantity, removeItemFromBasket }}>
            {children}
        </ItemsContext.Provider>
    );
}

export default ItemsProvider;
