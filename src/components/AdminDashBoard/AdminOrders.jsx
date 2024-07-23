import '../../sass/admin-orders.scss';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { useAuth } from '../../context/authContext.jsx';
import { HiPencilAlt } from "react-icons/hi";
import { Link } from 'react-router-dom'

const AdminOrders = () => {
    const { authState, logout } = useAuth();
    const [ allOrders, setAllOrders ] = useState([]);
    const [error, setError] = useState(null); 
    const [displayedOrders, setDisplayedOrders] = useState(10);
    const [isEditedOrderStatus, setIsEditedOrderStatus] = useState(false);
    const [editedOrderId, setEditedOrderId] = useState(null);
    const [updatedOrderStatus, setUpdatedOrderStatus] = useState(''); 
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();


    useEffect(() => {
        const getAllOrders = async () => {
            try {
                const response = await fetch('https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/orders/all', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + authState.token
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result.orders);
                    setAllOrders(result.orders);
                } else {
                    const { error } = await response.json();
                    setError(error);
                }
            } catch (error) {
                console.error('Error while getting orders :', error);
                setError('An unexpected error occurred. Please try again later.');
            }
        }

        if (authState.is_admin === true) {
            getAllOrders();
        } else {
            console.log('Non-admin access:', authState.is_admin); // Log when access is restricted
            setError('Restricted Access ! Not an admin or login as admin.');
        }

    }, [authState.token, authState.is_admin]);

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

    const loadMoreOrders = () => {
        setDisplayedOrders(displayedOrders + 10); // increment the number of displayed orders by 10
    };

    const editOrderIdStatus = (orderId, currentStatus) => {
        setEditedOrderId(orderId);
        setIsEditedOrderStatus(true);
        setUpdatedOrderStatus(currentStatus);
        setValue("order_status", currentStatus);
    }

    const handleOrderStatusChange = (e) => {
        setUpdatedOrderStatus(e.target.value);
    }

    const saveOrderStatus = async (orderId, data) => {
        try {
            const response = await fetch(`https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/orders/patch/${orderId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    order_status: updatedOrderStatus,
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.token}`
                },
            });

            if (response.ok) {
               
                const result = await response.json();
                const updatedOrders = allOrders.map(order => {
                    if (order.id === orderId) {
                        return { ...order, order_status: result.order.order_status };
                    }
                    return order;
                });
    
                setAllOrders(updatedOrders);
                //setUpdatedOrderStatus(result.order.order_status);
                setIsEditedOrderStatus(false); // Reset the editing state
                setEditedOrderId(null); // Reset the edited order ID
            } else {
                const { error } = await response.json();
                setError(error);
            }
        } catch (error) {
            console.error('Error in the editing the status of order :', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    }


    return (
        <>
            <div className='admin-orders-container'>
                <h1 className='title-all-orders'>All orders</h1>
                {error ? <p style={{marginTop: '50px', textAlign: 'center'}}>{error}</p> : (

                    <div className='admin-orders-list'>
                        <table className='orders-table'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Date</th>
                                    <th>User's email</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Total price</th>
                                    <th>Status</th>
                                    { isEditedOrderStatus ? '': <th>Action</th> }
                                </tr>
                            </thead>
                            {allOrders.slice(0, displayedOrders).map((order, index) => (
                                <tbody key={index}>
                                    <tr className='admin-orders-content'>
                                        <td data-label="Id">{order.id}</td>
                                        <td data-label="Date">{convertFormatDate(order.order_date)}</td>
                                        <td data-label="User's email">{order.email}</td>
                                        <td data-label="Firstname">{order.first_name}</td>
                                        <td data-label="Lastname">{order.last_name}</td>
                                        <td data-label="Total price">{((order.total_price) / 100).toFixed(2)} €</td>
                                        { isEditedOrderStatus && editedOrderId === order.id ? ( 
                                            <>
                                                <td data-label="Status" className='order-info'>
                                                    <form className='order-status-form' onSubmit={handleSubmit(() => saveOrderStatus(order.id))}>
                                                        <input 
                                                            {...register("order_status")}
                                                            type="text" 
                                                            value={updatedOrderStatus} 
                                                            onChange={handleOrderStatusChange} 
                                                            className='input-order-status'
                                                        />
                                                        <button disabled={isSubmitting} type='submit' className='btn-order-status'>
                                                                {isSubmitting ? "Loading..." : "Save"}
                                                        </button>
                                                    </form>
                                                </td>
                                            </>
                                        ) : ( 
                                            <>
                                                <td data-label="Status">{order.order_status}</td>
                                                 { !isEditedOrderStatus && ( 
                                                    <td data-label="Action">
                                                            <Link className='action-1' onClick={() => editOrderIdStatus(order.id, order.order_status) }>
                                                                <HiPencilAlt className='admin-btn-update-order'/>
                                                            </Link>
                                                    </td>
                                                 )} 
                                            </>
                                        )}
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                )}

                {displayedOrders < allOrders.length && (
                    <button className='btn-loadMore' onClick={loadMoreOrders}>Load More</button>
                )}
            </div>
        </>
    )
}

export default AdminOrders;