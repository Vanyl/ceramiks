import '../../sass/admin-items.scss';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useAuth } from '../../context/authContext.jsx';
import { HiPencilAlt } from "react-icons/hi";
import { Link } from 'react-router-dom'
import { MdDeleteOutline } from "react-icons/md";

const AdminItems = () => {
    const { authState } = useAuth();
    const [ allItems, setAllItems ] = useState([]);
    const [error, setError] = useState(null); 
   // const [displayedOrders, setDisplayedOrders] = useState(10);
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();


    useEffect(() => {
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

        /* if (authState.is_admin === true) {
            getAllItems();
        } else {
            setError('Restricted Access ! Not an admin.');
        } */
        getAllItems();
    }, []);

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

    const addItem = () => {
        console.log("add item");
    }
  
    
    return (
        <>
            <div className='admin-items-container'>
                <h1 className='title-all-items'>All Items</h1>
                <div className='btn-add-item-container'>
                    <button className='btn-add-item' onClick={addItem}>Add item</button>
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
            </div>
        </>
    )
}

export default AdminItems;