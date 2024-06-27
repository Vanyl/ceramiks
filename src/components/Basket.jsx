import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../sass/basket.scss';
import { IoMdClose } from "react-icons/io";
import image from "../assets/cake.jpg";


const Basket = ({ isBasketOpen, setIsBasketOpen }) => {
    if (!isBasketOpen) return null;
  

    return (
        <>
            <div className='basket-container'>
                <div className='basket-header'>
                    <p className='title'>Basket</p>
                    <IoMdClose className='close-basket' onClick={() => setIsBasketOpen(false)}/>
                </div>
                <div className='basket-content'>
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
                </div>
                <div className='basket-content'>
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
                </div>
                <div className='payement'>
                    <button className='payement-btn'>checkout €145,00 EUR</button>
                </div>
            </div>
        </>
    )
}

export default Basket