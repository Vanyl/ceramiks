import { useState, useEffect } from 'react';
import '../sass/banner.scss'

const Banner = () => {


    const slideImages = [
        {
            src: 'https://brutalceramics.com/cdn/shop/files/32-MD009-Judith-Lasry-Brutal-Ceramics-hds-7312_1200x.jpg?v=1715801643',
            alt: 'collection'
        },
        {
            src: 'https://brutalceramics.com/cdn/shop/files/32-MD007-Japon-Yoh-Kashiwai-Brutal-Ceramics-hds-6576_1200x.jpg?v=1713987295',
            alt: 'mugs'
        },
        {
            src: 'https://cdn.shopify.com/s/files/1/0017/4633/7890/files/brutal-ceramics-interview-tom-and-folks-hds-14.jpg?v=1656172315',
            alt: 'mugs'
        },
    ];

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
                            // style={{backgroundImage:`url('https://brutalceramics.com/cdn/shop/files/32-MD009-Judith-Lasry-Brutal-Ceramics-hds-7312_1200x.jpg?v=1715801643')`}}
                            src={slide.src}
                        />
                    ))}
                </div>
                <div className='banner-bottom'>
                <span className='banner-title'>title</span>
                <button className='banner-btn'>texte btn</button>
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