import '../sass/item.scss'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";

const Item = () => {
    const { product } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [currentImage, setCurrentImage] = useState(0);

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

    return (
        <>
            <div className='product-container'>
                <div className='item-gallery'>
                    <div className='main-picture'>
                        <img
                            className='img-main-picture'
                            src={productImages[currentImage].img}
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
                        {productImages.map((image, i) => (
                            <img
                                className='img-side-pictures'
                                src={image.thumbnail}
                                onMouseOver={e => (setCurrentImage(i))}
                                alt="coucou"
                            />
                        ))}
                    </div>
                </div>
                <div className='item-info'>
                    <h2>{product.collection}</h2>
                    <h1 className='item-title'>{product}</h1>
                    <span>€{product.price}</span>
                    <p>{product.stock}</p>
                    <div className='item-quantity'>
                        <button className='item-quantity-minus disable-hover' onClick={handleMinusClick}><FaMinus /></button>
                        <span>{quantity}</span>
                        <button className='item-quantity-plus disable-hover' onClick={handlePlusClick}><FaPlus /></button>
                    </div>
                    <button className='button-add-item'>add</button>
                </div>
            </div>
        </>
    )
}

export default Item;