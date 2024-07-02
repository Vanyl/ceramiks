import { useState, useEffect, useContext } from "react"
import { Link } from 'react-router-dom'
import '../sass/bestsellers.scss'
import { ItemsContext } from "../context/itemsContext";

const Bestsellers = () => {
    const { allItems } = useContext(ItemsContext)

    const bestsellers = allItems.sort((a, b) => a.stock - b.stock);


    return (
        <>
            <h1>Best sellers</h1>
            <div className="cards">
                {bestsellers.slice(0, 4).map((product, i) => (
                    <div key={i} className="card-container">
                        <div className="card-img">
                            <Link to={`/products/${product.name}`} className='link-to-product'>
                                <img
                                    className="card-img"
                                    src={product.Items_img[0].image_url}
                                    alt={product.name}
                                    onMouseEnter={(e) => (e.currentTarget.src = product.Items_img[1].image_url)}
                                    onMouseLeave={(e) => (e.currentTarget.src = product.Items_img[0].image_url)}
                                />
                            </Link>
                        </div>
                        <div className="card-body">
                            <Link to={`/products/${product.name}`} className='link-to-product'>
                                <div className="card-title">{product.name}</div>
                            </Link>
                            <div className="card-price">€ {(product.price / 100).toFixed(2)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

}

export default Bestsellers