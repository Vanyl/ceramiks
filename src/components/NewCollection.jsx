import React, {useEffect} from 'react'
import '../sass/new-collection.scss'
import cake from '../assets/cake.jpg'


function NewCollection() {

    useEffect(() => {
        //
    }, []);

    return (
        <>
            <div className='collection-container'>
                <div className='collection'>
                    {/* <img src={cake} alt="ex" /> */}
                    <div className='overlay'>
                        <p className='element-p'>Discover</p>
                        <p className='element-p'>Collection title</p>
                        <button className='element-btn'>See products</button>
                    </div>
                </div>
                <div className='collection'>
                    {/* <img src={cake} alt="ex" /> */}
                    <div className='overlay'>
                        <p className='element-p'>Discover</p>
                        <p className='element-p'>Collection title</p>
                        <button className='element-btn'>See products</button>
                    </div>
                </div>
                <div className='collection'>
                    {/* <img src={cake} alt="ex" /> */}
                    <div className='overlay'>
                        <p className='element-p'>Discover</p>
                        <p className='element-p'>Collection title</p>
                        <button className='element-btn'>See products</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewCollection;