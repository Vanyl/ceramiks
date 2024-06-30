import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import '../sass/basket.scss';
import { IoMdClose } from "react-icons/io";
import image from "../assets/cake.jpg";
import { ItemsContext } from '../context/itemsContext';


const Basket = ({ isBasketOpen, setIsBasketOpen }) => {
    const { cartItems, removeItemFromBasket, updateItemQuantity } = useContext(ItemsContext);

    if (!isBasketOpen) {
        return null;
    }

    const handleQuantityChange = (itemId, quantity) => {
        if (quantity > 0) {
            updateItemQuantity(itemId, quantity);
        }
    };

    const handleRemoveItem = (itemId) => {
        removeItemFromBasket(itemId);
    };

    return (
        <>
            <div className='basket-container'>
                <div className='basket-header'>
                    <p className='title'>Basket</p>
                    <IoMdClose className='close-basket' onClick={() => setIsBasketOpen(false)}/>
                </div>
                {cartItems.map((item) => (
                    <div className='basket-content' key={item.id}>
                        <img src={item.Items_img.find(img => img.is_main)?.image_url} alt="product's image" />
                        <div className='all-info-btn'>
                            <div className='info-product'>
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                            </div>
                            <div className='basket-btn'>
                                <div className='btn-qty'>
                                    <button className="quantity" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                                    <input 
                                        className= 'product-quantity' 
                                        name="product-qty" 
                                        type="number" 
                                        min="0" 
                                        max="10" 
                                        value={item.quantity} 
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                     />
                                    <button className="quantity" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                                </div>
                                <div className='delete-product'>
                                    <button className='delete-btn' onClick={ () => handleRemoveItem(item.id) }>Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
               {/*  <div className='basket-content'>
                    <img src={image} alt="product's image" />
                    <div className='all-info-btn'>
                        <div className='info-product'>
                            <p>Article 1</p>
                            <p>€ 20,00</p>
                        </div>
                        <div className='basket-btn'>
                            <div className='btn-qty'>
                                <button className="quantity">-</button>
                                <input className= 'product-quantity' name="product-qty" type="number" min="0" max="10" value="1" />
                                <button className="quantity">+</button>
                            </div>
                            <div className='delete-product'>
                                <button className='delete-btn'>Remove</button>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className='payement'>
                    <button className='payement-btn'>
                        checkout €{(cartItems.reduce((total, item) => total + item.price * item.quantity, 0) / 100).toFixed(2)} EUR
                    </button>
                </div>
            </div>
        </>
    )
}

export default Basket