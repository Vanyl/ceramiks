import { useState, useEffect, useContext } from "react"
import { CollectionsContext } from '../../context/collectionsContext.jsx'
import { useAuth } from '../../context/authContext.jsx';
import '../../sass/admin-collection.scss'
import { HiPencilAlt } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { Oval } from 'react-loader-spinner';

const AdminCollections = () => {
    const { authState } = useAuth();
    const { allCollections, setAllCollections, isLoading } = useContext(CollectionsContext);
    const [showAddForm, setShowAddForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [newCollection, setNewCollection] = useState('')
    const [collectionToEdit, setCollectionToEdit] = useState(null);
    const [nameCollectionEdited, setNameCollectionEdited] = useState('')
    const [displayedCollections, setDisplayedCollections] = useState(10)


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
                const newCollectionData = await response.json();
                const newCollection = newCollectionData.collection;
                setAllCollections(prevCollections => [newCollection, ...prevCollections]);
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
        try {
            const response = await fetch(`https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/delete/collection/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.token}`
                },
            });

            if (response.ok) {
                setAllCollections(prevCollections => prevCollections.filter(collection => collection.id !== id));
            } else {
                const errorData = await response.json();
                console.error('Error deleting collection:', errorData);
            }
        } catch (error) {
            console.error('Error deleting collection:', error);
        }
    };

    const onDelete = (id) => {
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
                    const updatedCollectionData = await response.json()
                    const updatedCollection = updatedCollectionData.collection;
                    setAllCollections(
                        prevCollections =>
                            prevCollections.map(collection =>
                                collection.id === updatedCollection.id ? updatedCollection : collection
                            )
                    )
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


    const loadMoreCollections = () => {
        setDisplayedCollections(displayedCollections + 10);
    };

    const convertFormatDate = (dateString) => {
        const date = new Date(dateString);  //August 19, 1975 23:15:30
        const day = date.getDate();  //19
        const month = date.toLocaleString('default', { month: 'long' }); //august
        const year = date.getFullYear(); //1975
        let time = date.toLocaleString('default', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // Set to true for 12-hour format, false for 24-hour format
        })
        return `${day} ${month} ${year}  -  ${time}`;
    }

    if (authState.is_admin === false) {
        return (
            <div>
                Restricted Access! Not an admin or login as admin.
            </div>
        );
    }

    return (
        <div className="admin-collections-container">
            <h1 className='title-all-collections'>All collections</h1>

            <button onClick={handleAddClick} style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}>add collection</button>
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
                        <button type="button" onClick={handleCancellation}>cancel</button>
                    </div>
                </form>
            )}
            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <Oval
                        visible={true}
                        height="80"
                        width="80"
                        color="#e2725b"
                        secondaryColor="#f4c8bf"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass="loading-spinner"
                    />
                </div>
            ) : (
                <>
                    <div className="admin-collections-list">
                        <table className='collections-table'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody >
                                {allCollections?.map((collection) => (
                                    <tr className='admin-collections-content' key={collection.id}>
                                        <td data-label="Id">{collection.id}</td>
                                        <td data-label="Date">{convertFormatDate(collection.date_created)}</td>
                                        <td data-label="Name">{collection.name}</td>
                                        <td data-label="Action">
                                            <HiPencilAlt className='admin-btn-edit-collection' onClick={() => handleEditClick(collection)} />
                                            <AiFillDelete className='admin-btn-delete-collection' onClick={() => onDelete(collection.id)} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className='btn-loadMore'>
                            {displayedCollections < allCollections.length && (
                                <button className='btn-loadMore' onClick={loadMoreCollections}>Load More</button>
                            )}
                        </div>
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
                                <button type="button" onClick={handleCancellation}>cancel</button>
                            </div>
                        </form>
                    )}
                </>
            )}
        </div>
    )
}

export default AdminCollections