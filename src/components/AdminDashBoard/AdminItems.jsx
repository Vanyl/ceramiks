import '../../sass/admin-items.scss';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useAuth } from '../../context/authContext.jsx';
import { HiPencilAlt } from "react-icons/hi";
import { Link } from 'react-router-dom'
import { MdDeleteOutline } from "react-icons/md";
//https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/add/items (POST)
//
//https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/add/itemsimg/:id (POST)

const AdminItems = () => {
    const { authState } = useAuth();
    const [ allItems, setAllItems ] = useState([]);
    const [error, setError] = useState(null); 
    const [collections, setCollections] = useState([]);

    const [ showAddForm, setShowAddForm ] = useState(false);
   // const [displayedOrders, setDisplayedOrders] = useState(10);
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();


    
    const getAllItems = async () => {    
        try {
            const response = await fetch('https://ecommerce-website3333-593ff35538d5.herokuapp.com/api/items', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    //Authorization: 'Bearer '+ authState.token
                },
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log(result.Objets);
                setAllItems(result.Objets);
            } else {
                const { error } = await response.json();
                setError(error);
            }
        } catch (error) {
            console.error('Error while getting all items in admin dasboard :', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    }

    const getAllCollections = async () => {
        try {
            const response = await fetch('https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/all/collections', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+ authState.token
            },
            });
    
            if (response.ok) {
            const data = await response.json();
            setCollections(data); // Assuming data is an array of collections
            } else {
            console.error('Failed to fetch collections');
            }
        } catch (error) {
            console.error('Error fetching collections:', error);
        }
    };

    useEffect(() => {
        if (authState.is_admin) {
            getAllItems();
            getAllCollections();
        } else {
            setError('Restricted Access! Not an admin.');
        }
    }, [authState.is_admin, authState.token]); // Depend on auth state changes

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
        return `${day} ${month} ${year}  -  ${time }`;
    }

    const deleteItem = () => {
        console.log("this is a delete");
    }

    const editItem = () => {
        console.log("this is an edit");
    }

    const handleAddForm = () => {
        setShowAddForm(true);
    };

    const handleCancellation = () => {
        setShowAddForm(false);
       // setShowEditForm(false);
    }

    const addItem = async (data) => {

        console.log('Form data:', data);
        const mainDataForm = new FormData();
        mainDataForm.append('name', data.name);
        mainDataForm.append('collection_id', data.collection_id);
        mainDataForm.append('description', data.description);
        mainDataForm.append('product_type', data.product_type);
        mainDataForm.append('stock', data.stock);
        mainDataForm.append('price', data.price);
        mainDataForm.append('image', data.image[0]);
    
        // Create FormData for the second endpoint (additional pictures)
        /* const additionalImagesForm = new FormData();
        Array.from(data.additionalImages).forEach((file, index) => {
          additionalImagesForm.append(`images[${index}]`, file);
        }); */
    
     /*   try {
           // Send data to both endpoints using Promise.all
          const [mainResponse, additionalImagesResponse] = await Promise.all([
            fetch('https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/add/items', {
              method: 'POST',
              body: mainDataForm,
            }),
            fetch('https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/add/itemsimg/${newItem.id}', {
              method: 'POST',
              body: additionalImagesForm,
            })
          ]);
    
          // Check if both requests were successful
          if (mainResponse.ok && additionalImagesResponse.ok) {
            console.log('Item and images added successfully!');
            setAllItems(prevItems => [newItem, ...prevItems]);
            setShowAddForm(false);
            setNewCollection("");
          } else {
            console.error('Error adding item or images:', mainResponse.statusText, additionalImagesResponse.statusText);
          }
        } catch (error) {
          console.error('Error during form submission:', error);
        } */

        try {
            // Send data to create the item
            const mainResponse = await fetch('https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/add/items', {
                method: 'POST',
                body: mainDataForm,
                headers: {
                    Authorization: 'Bearer '+ authState.token
                },
            });
    
            // Check if the item was created successfully
            if (mainResponse.ok) {
                const newItem = await mainResponse.json();
                
                console.log('Item created:', newItem);
                console.log('Item created yes:', newItem.itemId);
    
                // Prepare FormData for additional images
                const additionalImagesForm = new FormData();
                for (let i = 0; i < data.images.length; i++) {
                    additionalImagesForm.append('images', data.images[i]);
                }
    
                // Send additional images to the route with the new item's ID
                const additionalImagesResponse = await fetch(`https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/add/itemsimg/${newItem.itemId}`, {
                    method: 'POST',
                    body: additionalImagesForm,
                    headers: {
                        Authorization: 'Bearer '+ authState.token
                    },
                });
                console.log('Form data:', data);

                // Check if additional images were uploaded successfully
                if (additionalImagesResponse.ok) {
                    console.log('Additional images added successfully!');
                    setAllItems(prevItems => [newItem, ...prevItems]);
                   // reset();
                    setShowAddForm(false);
                } else {
                    console.error('Error adding additional images:', additionalImagesResponse.statusText);
                }
            } else {
                console.error('Error creating item:', mainResponse.statusText);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    }
  
    
    return (
        <>
            <div className='admin-items-container'>
                <h1 className='title-all-items'>All Items</h1>
                <div className='btn-add-item-container'>
                    <button className='btn-add-item' onClick={handleAddForm}>Add item</button>
                </div>
                <div className='items-list'>
                    { allItems.map(item => (
                        <div className='item-card' key={item.id}>
                            <div className='card-left-content'>
                                <img src={item.Items_img.find(img => img.is_main)?.image_url} alt='Item image' />
                                <div className='card-item-content'>
                                    <p>{item.id}</p>
                                    <p className='item-name'>{item.name}</p>
                                    <p>{item.description}</p>
                                    <div className='items-more-details'>
                                        <p>{item.product_type}</p>
                                        <p>{(item.price/ 100).toFixed(2)} €</p>
                                        <p>Stock : {item.stock}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='btn-id-item'>
                                <p>{item.id}</p>
                                <div className='btn-action-item'>
                                    <button className='btn-edit-item' onClick={editItem}>
                                        <HiPencilAlt className='edit-icon'/>
                                    </button>
                                    <button className='btn-delete-item' onClick={deleteItem}>
                                        <MdDeleteOutline className='delete-icon'/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {showAddForm && (
                    <div className='add-item-form-container'>
                        <h1 className= 'add-title-form'>Add an Item</h1>
                        <form onSubmit={handleSubmit(addItem)} className='add-item-form'>
                            <input {...register("name", { required: "The name is required" })} type='text' placeholder='Name'/>
                            <p>{errors.name && errors.name.message}</p>
                            <select {...register('collection_id', { required: 'Please select a collection' })}>
                                <option value="">Select a collection</option>
                                {collections.map(collection => (
                                <option key={collection.id} value={collection.id}>
                                    {collection.name}
                                </option>
                                ))}
                            </select>
                            {/* {authState.is_admin ? 'oui': 'non'} */}
                            <p>{errors.collection_id && errors.collection_id.message}</p>
                            <textarea {...register("description", { required: "The description is required" })} rows="5" cols="65" placeholder='Description'/>
                            <p>{errors.description && errors.description.message}</p>
                            <input {...register("product_type", { required: "The type of the product is required" })} type='text' placeholder='Product Type'/>
                            <p>{errors.product_type && errors.product_type.message}</p>
                            <input {...register("stock", { required: "The stock is required" })} type='number' placeholder='Stock'/>
                            <p>{errors.stock && errors.stock.message}</p>
                            <input {...register("price", { required: "The price is required" })} type='number' placeholder='Price'/>
                            <p>{errors.price && errors.price.message}</p>
                            <input {...register("image", 
                                {   required: "The main picture is required", 
                                    validate: {isSingleFile: files => files.length === 1 || 'Only one image can be uploaded'} 
                                })} 
                                type="file" 
                                accept=".png, .jpg, .jpeg"
                                name='image'
                            />
                            <p>{errors.image && errors.image.message}</p>
                            <input {...register("images", 
                                {   
                                validate: {isMultipleFiles: files => files.length === 2 || 'You must upload 2 images'}                                })} 
                                type="file" 
                                accept=".png, .jpg, .jpeg"
                                name="images[]"
                                multiple
                            />
                            <p>{errors.images && errors.images.message}</p>

                            <div className="btn-edit-cancel-div">
                               {/*  <button type="submit">Edit</button> */}
                                <button className='auth-btn' disabled={isSubmitting} type='submit'>
                                {isSubmitting ? "Loading..." : "Add"}
                                </button>
                                <button type="button" onClick={handleCancellation}>cancel</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}

export default AdminItems;