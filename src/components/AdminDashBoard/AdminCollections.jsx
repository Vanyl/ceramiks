import { useState, useEffect, useContext } from "react"
import { CollectionsContext } from '../../context/collectionsContext.jsx'
import { useAuth } from '../../context/authContext.jsx';


const AdminCollections = () => {
    const { authState } = useAuth();
    const { allCollections, isLoading } = useContext(CollectionsContext);
    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [newCollection, setNewCollection] = useState('')
    const [collectionToEdit, setCollectionToEdit] = useState(null);
    const [nameCollectionEdited, setNameCollectionEdited] = useState('')

    const handleAddClick = () => {
        setShowAddForm(true);
    };

    const handleEditClick = (collection) => {
        setCollectionToEdit(collection.id); //collectionToEdit will be an ID or null
        setNameCollectionEdited(collection.name)
        setShowEditForm(true);
    };

    const addNewCollection = async (e) => {
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

    const deleteCollection = async (id) => {
        // e.preventDefault();
        console.log(id)
        try {
            const response = await fetch(`https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/delete/collections/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.token}`
                },
            });

            if (response.ok) {
                //
            } else {
                const errorData = await response.json();
                console.error('Error deleting collection:', errorData);
            }
        } catch (error) {
            console.error('Error deleting collection:', error);
        }
    };

    const onDelete = (id) => {
        console.log(id)
        deleteCollection(id);
    };

    const editCollection = async (e) => {
        e.preventDefault();
        if (collectionToEdit !== null) {
            try {
                const response = await fetch(`https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/patch/collection/${collectionToEdit}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authState.token}`
                    },
                    body: JSON.stringify({ name: nameCollectionEdited }),
                });
    
                if (response.ok) {
                    setShowEditForm(false);
                    setCollectionToEdit(null);
                    setNameCollectionEdited('')
                } else {
                    console.error('Error editing collection:', response.statusText);
                }
            } catch (error) {
                console.error('Error editing collection:', error);
            }
        }
    }


    return (
        <div style={{ marginTop: '250px' }}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                <div style={{ display: 'flex', gap: '25px', justifyContent: 'center' }}>
                    {allCollections?.map((collection) => (
                        <div key={collection.id} className="collection-card" style={{ display: 'flex', gap: '25px', alignContent: 'center', flexDirection: 'column', border: '1px solid black' }}>
                            <p>{collection.name}</p>
                            <p>Created on {new Date(collection.date_created).toISOString().split('T')[0]}</p>
                            <button onClick={() => handleEditClick(collection)}>edit</button>
                            <button onClick={() => onDelete(collection.id)}>delete</button>
                        </div>
                    ))}
                </div>
                {showEditForm && (
                        <form onSubmit={editCollection} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <input
                                type="text"
                                name={nameCollectionEdited}
                                value={nameCollectionEdited}
                                onChange={(e) => setNameCollectionEdited(e.target.value)}
                                placeholder="Collection Name"
                                required
                                style={{ marginBottom: '10px', padding: '5px', fontSize: '16px' }}
                            />
                            <button type="submit" style={{ padding: '5px 10px', fontSize: '16px' }}>Edit</button>
                        </form>
                    )}
                </>
            )}
            <button onClick={handleAddClick} style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>add collection</button>
            {showAddForm && (
                <form onSubmit={addNewCollection} style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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