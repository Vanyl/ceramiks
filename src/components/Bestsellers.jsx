import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import '../sass/bestsellers.scss'

const Bestsellers = () => {

    const products = [
        {
            name: 'plate',
            img: 'https://brutalceramics.com/cdn/shop/files/32-MD007-Japon-Yoh-Kashiwai-Brutal-Ceramics-hdc-6542_700x.jpg?v=1713876620',
            img_hover: 'https://brutalceramics.com/cdn/shop/files/32-MD007-Japon-Yoh-Kashiwai-Brutal-Ceramics-hdc-6553_700x.jpg?v=1713876938',
            price: '50'
        },
        {
            name: 'bol',
            img: '',
            img_hover: '',
            price: '35'
        },
        {
            name: 'mug',
            img: '',
            img_hover: '',
            price: '20'
        },
        {
            name: 'mug2',
            img: '',
            img_hover: '',
            price: '20'
        }
    ]



    return (
        <>
            <h1>Best sellers</h1>
            <div className="cards">
                {products.map((product, i) => (
                    <div key={i} className="card-container">
                        <div className="card-img">
                            <Link to={`/products/${product.name}`}  className='link-to-product'>
                                <img
                                    src={product.img}
                                    className="card-img"
                                    onMouseOver={(e) => (
                                        e.currentTarget.src = product.img_hover
                                    )}
                                    onMouseLeave={(e) => (
                                        e.currentTarget.src = product.img
                                    )}
                                />
                            </Link>
                        </div>
                        <div className="card-body">
                            <Link to={`/products/${product.name}`}  className='link-to-product'>
                                <div className="card-title">{product.name}</div>
                            </Link>
                            <div className="card-price">€{product.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

}

export default Bestsellers