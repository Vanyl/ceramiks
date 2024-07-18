import { useState, useEffect, useContext } from "react"
import { CollectionsContext } from '../../context/collectionsContext.jsx'
import { useAuth } from '../../context/authContext.jsx';
import '../../sass/admin-collection.scss'


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
        setCollectionToEdit(collection.id); //collectionToEdit will be an id or null
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
                // const newCollection = await response.json();
                //en recevant dans le body la collection updated mettre à jour les collections
                setShowAddForm(false);
                setNewCollection("");
            } else {
                console.error('Error adding collection:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding collection:', error);
        }
    };

    // const deleteCollection = async (id) => {
    //     // e.preventDefault();
    //     try {
    //         const response = await fetch(`https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/delete/collections/${id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${authState.token}`
    //             },
    //         });

    //         if (response.ok) {
    //             //
    //         } else {
    //             const errorData = await response.json();
    //             console.error('Error deleting collection:', errorData);
    //         }
    //     } catch (error) {
    //         console.error('Error deleting collection:', error);
    //     }
    // };

    const onDelete = (id) => {
        // deleteCollection(id);
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

    const handleCancellation = () => {
        setShowAddForm(false);
        setShowEditForm(false);
    }


    return (
        <div className="admin-collections-container">
            <button onClick={handleAddClick} style={{ marginTop: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>add collection</button>
            {showAddForm && (
                <form onSubmit={addNewCollection} className='collection-add-form'>
                    <input
                        type="text"
                        name={newCollection}
                        value={newCollection}
                        onChange={(e) => setNewCollection(e.target.value)}
                        placeholder="Collection Name"
                        required
                        style={{ marginBottom: '10px', padding: '5px', fontSize: '16px' }}
                    />
                    <div className="btn-add-cancel-div">
                    <button type="submit">Create</button>
                    <button onClick={handleCancellation}>cancel</button>
                    </div>
                </form>
            )}
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="collections-container">
                        {allCollections?.map((collection) => (
                            <div key={collection.id} className="collection-card">
                                <p className="collection-title">{collection.name}</p>
                                <p>Created on {new Date(collection.date_created).toISOString().split('T')[0]}</p>
                                <div className="btn-edit-delete-div">
                                    <button className="edit-btn" onClick={() => handleEditClick(collection)}>edit</button>
                                    <button className="delete-btn" onClick={() => onDelete(collection.id)}>delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {showEditForm && (
                        <form onSubmit={editCollection} className='collection-edit-form'>
                            <input
                                type="text"
                                name={nameCollectionEdited}
                                value={nameCollectionEdited}
                                onChange={(e) => setNameCollectionEdited(e.target.value)}
                                placeholder="Collection Name"
                                required
                                style={{ marginBottom: '10px', padding: '5px', fontSize: '16px' }}
                            />
                            <div className="btn-edit-cancel-div">
                            <button type="submit">Edit</button>
                            <button onClick={handleCancellation}>cancel</button>
                            </div>
                        </form>
                    )}
                </>
            )}
        </div>
    )
}

export default AdminCollections