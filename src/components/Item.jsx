import '../sass/item.scss'
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const Item = () => {
    const { product } = useParams();
    const [quantity, setQuantity] = useState(1);

    const handleMinusClick = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handlePlusClick = () => {
        setQuantity(quantity + 1);
    };

    return (
        <>
            <div className='item-gallery'>
                <div className='side-pictures'>
                    <img src="" alt="coucou" />
                </div>
                <div className='main-picture'>
                    <img src="" alt="main_picture" />
                </div>
            </div>
            <div className='item-info'>
                <h2>{product.collection}</h2>
                <h1>{product}</h1>
                <span>€{product.price}</span>
                <p>{product.stock}</p>
                <div className='item-quantity'>
                    <button className='item-quantity-minus disable-hover' onClick={handleMinusClick}>-</button>
                    <span>{quantity}</span>
                    <button className='item-quantity-plus disable-hover' onClick={handlePlusClick}>+</button>
                </div>
                <button>add</button>
            </div>
        </>
    )
}

export default Item;