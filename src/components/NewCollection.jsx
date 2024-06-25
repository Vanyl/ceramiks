import React, {useState, useEffect} from 'react'
import '../sass/new-collection.scss'


function NewCollection() {

    const [collections, setCollections] = useState([]);

    const getCollections = async () => {
        try {
            const response = await fetch(`https://ecommerce-website3333-593ff35538d5.herokuapp.com/api/collections`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
    
            if (response.ok) {
                const collectionsData = await response.json();
                return setCollections(collectionsData);
            } else {
                console.error('Error while getting all collections:', result.statusText);
            }
        } catch (error) {
            console.error('Error while getting all collections:', error);
        }
    };

    useEffect(() => {
        getCollections();
    }, []);

    return (
        <>
            <div className='collection-container'>
                {collections.slice(0, 3).map((collection) => (

                    <div className='collection' key={collection.id} 
                    style={{ }}
                    >
                        <div className='overlay'>
                            <p className='element-p'>Discover</p>
                            <p className='element-p'>Collection {collection.name}</p>
                            <button className='element-btn'>See products</button>
                        </div>
                    </div>
                /* <div className='collection'>
                    <div className='overlay'>
                        <p className='element-p'>Discover</p>
                        <p className='element-p'>Collection title</p>
                        <button className='element-btn'>See products</button>
                    </div>
                </div>
                <div className='collection'>
                    / <img src={cake} alt="ex" /> 
                    <div className='overlay'>
                        <p className='element-p'>Discover</p>
                        <p className='element-p'>Collection title</p>
                        <button className='element-btn'>See products</button>
                    </div>
                </div> */
                ))}
            </div>
        </>
    )
}

export default NewCollection;