import '../sass/item.scss'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";

const Item = () => {
    const { product } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [currentImage, setCurrentImage] = useState(0);
    const [item, setItem] = useState(null);


    const handleMinusClick = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handlePlusClick = () => {
        setQuantity(quantity + 1);
    };

    const productImages = [
        {
            img: 'https://brutalceramics.com/cdn/shop/files/32-MD007-Japon-Yoh-Kashiwai-Brutal-Ceramics-hdc-6542_700x.jpg?v=1713876620',
            thumbnail: 'https://brutalceramics.com/cdn/shop/files/32-MD007-Japon-Yoh-Kashiwai-Brutal-Ceramics-hdc-6542_700x.jpg?v=1713876620'
        },
        {
            img: 'https://brutalceramics.com/cdn/shop/files/32-MD007-Japon-Yoh-Kashiwai-Brutal-Ceramics-hdc-6553_700x.jpg?v=1713876938',
            thumbnail: 'https://brutalceramics.com/cdn/shop/files/32-MD007-Japon-Yoh-Kashiwai-Brutal-Ceramics-hdc-6553_700x.jpg?v=1713876938'
        },
        {
            img: 'https://brutalceramics.com/cdn/shop/files/32-MD007-Japon-Yoh-Kashiwai-Brutal-Ceramics-hdc-6544_700x.jpg?v=1713876938',
            thumbnail: 'https://brutalceramics.com/cdn/shop/files/32-MD007-Japon-Yoh-Kashiwai-Brutal-Ceramics-hdc-6544_700x.jpg?v=1713876938'
        }
    ]

    const getItem = async () => {
        try {
            const response = await fetch(`https://ecommerce-website3333-593ff35538d5.herokuapp.com/api/items`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const itemsData = await response.json();
                setItem(itemsData.find((item) => item.name === product));
                // return setItem(itemsData);
            } else {
                console.error('Error while getting all items:', result.statusText);
            }
        } catch (error) {
            console.error('Error while getting all items:', error);
        }
    };

    useEffect(() => {
        getItem();
    }, []);

    return (
        <>  {item ? (
            <div className='product-container'>
                <div className='item-gallery'>
                    <div className='main-picture'>
                        <img
                            className='img-main-picture'
                            src={item.Items_img.find(img => !img.is_main)?.image_url}
                            alt="main_picture"
                        />
                        {/* {productImages.map((image) => (
                        <img
                        className='main-picture'
                        src={image.img}
                        alt="coucou"
                        />
                        ))} */}
                    </div>
                    <div className='side-pictures'>
                        {item.Items_img.map((image,i) => (
                            <img
                                key={i}
                                className='img-side-pictures'
                                src={image.image_url}
                                onMouseOver={e => (setCurrentImage(i))}
                                alt="coucou"
                            />
                        ))}
                    </div>
                </div>
                <div className='item-info'>
                    <h2 className='item-collection'>{item.collection.name}</h2>
                    <h1 className='item-title'>{item.name}</h1>
                    <span className='item-price'>€ {(item.price/100).toFixed(2)}</span>
                    <hr className='item-hr' />
                    <p className='item-stock'>{item.stock} items left</p>
                    <div className='item-quantity'>
                        <button className='item-quantity-minus disable-hover' onClick={handleMinusClick}><FaMinus /></button>
                        <span>{quantity}</span>
                        <button className='item-quantity-plus disable-hover' onClick={handlePlusClick}><FaPlus /></button>
                    </div>
                    <button className='button-add-item'>add</button>
                    <p className='item-description'>{item.description}.</p>
                </div>
            </div>
        ): (
            <p>Loading item data...</p>
        )}
        </>
    )
}

export default Item;