import { useState, useEffect, useContext } from "react"
import { CollectionsContext } from '../../context/collectionsContext.jsx'
import { useAuth } from '../../context/authContext.jsx';


const AdminCollections = () => {
    const { allCollections, isLoading } = useContext(CollectionsContext);
    const [showAddForm, setShowAddForm] = useState(false)
    const [newCollection, setNewCollection] = useState('')
    const { authState } = useAuth();
    console.log(authState)
    console.log(typeof authState.token)
    
    const handleAddClick = () => {
        setShowAddForm(true);
    };
    //https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/add/collection (post) name obligé
    //https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/patch/collection/:id (patch) name obligé
    //https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/delete/collections/:id (delete)

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/add/collection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.token}`
                },
                body: JSON.stringify({ name: newCollection }),
            });

            if (response.ok) {
                const newCollection = await response.json();
                setShowAddForm(false);
                setNewCollection("");
            } else {
                console.error('Error adding collection:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding collection:', error);
        }
    };


    return (
        <div style={{ marginTop: '250px' }}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div style={{display: 'flex', gap:'25px', justifyContent: 'center'}}>
                    {allCollections?.map((collection) => (
                        <div key={collection.id} className="collection-card" style={{display: 'flex', gap:'25px', alignContent: 'center', flexDirection: 'column', border: '1px solid black'}}>
                            <p>{collection.name}</p>
                            <p>Created on {new Date(collection.date_created).toISOString().split('T')[0]}</p>
                            <button>edit</button>
                            <button>delete</button>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={handleAddClick}>add collection</button>
            {showAddForm && (
                <form onSubmit={handleFormSubmit} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input
                        type="text"
                        name={newCollection}
                        value={newCollection}
                        onChange={(e) => setNewCollection(e.target.value)}
                        placeholder="Collection Name"
                        required
                        style={{ marginBottom: '10px', padding: '5px', fontSize: '16px' }}
                    />
                    <button type="submit" style={{ padding: '5px 10px', fontSize: '16px' }}>Create</button>
                </form>
            )}
        </div>
    )
}

export default AdminCollections