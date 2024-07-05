import { useState, useEffect, useContext } from 'react';
import '../sass/banner.scss'
import { ItemsContext } from "../context/itemsContext";

const Banner = () => {
    const { allItems, allTypes } = useContext(ItemsContext)

    const slideImages = [
        {
            src: 'https://brutalceramics.com/cdn/shop/files/32-MD009-Judith-Lasry-Brutal-Ceramics-hds-7312_1200x.jpg?v=1715801643',
            alt: 'collection',
            name: 'loading...' //need to wait to receive
        },
        {
            src: 'https://brutalceramics.com/cdn/shop/files/32-MD007-Japon-Yoh-Kashiwai-Brutal-Ceramics-hds-6576_1200x.jpg?v=1713987295',
            alt: 'mugs',
            name: 'loading...'

        },
        {
            src: 'https://cdn.shopify.com/s/files/1/0017/4633/7890/files/brutal-ceramics-interview-tom-and-folks-hds-14.jpg?v=1656172315',
            alt: 'bowl',
            name: 'loading...'
        },
    ];

    // Update the names based on allItems availability
    if (allItems.length > 0) {
        slideImages[0].name = allItems[0]?.collection?.name || 'Collection 1';
        slideImages[1].name = allTypes[0]?.product_type || 'Collection 2';
        slideImages[2].name = allTypes[1]?.product_type || 'Collection 3';
    }

    const [current, setCurrent] = useState(0);
    const time = 10000;


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((current) => (current === slideImages.length - 1 ? 0 : current + 1));
        }, time);

        return () => clearInterval(interval);
    }, [current, slideImages.length, time]);


    return (

        <>
            <div className="banner-container">
                <div className="carousel">
                    {slideImages.map((slide, index) => (
                        <img
                            key={index}
                            className={`slide ${index === current ? 'active' : ''}`}
                            src={slide.src}
                        />
                    ))}
                </div>
                <div className='banner-bottom'>
                    <span className="banner-title">{slideImages[current].name}</span>
                    <button className="banner-btn">SEE {slideImages[current].name}</button>
                    <div className="carousel-dots">
                        {slideImages.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === current ? 'active' : ''}`}
                                onClick={() => setCurrent(index)}
                            ></span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Banner