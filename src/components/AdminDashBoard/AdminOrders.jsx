import '../../sass/admin-orders.scss';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext.jsx';
import { HiPencilAlt } from "react-icons/hi";
import { Link } from 'react-router-dom'

const AdminOrders = () => {
    const { authState, logout } = useAuth();
    const [allOrders, setAllOrders] = useState([]);
    const [error, setError] = useState(null); //to store error message
    const [displayedOrders, setDisplayedOrders] = useState(10);


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

    return (
        <>
            <div className='admin-orders-container'>
                <h1 className='title-all-orders'>All orders</h1>
                {error ? <p>{error}</p> : (

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
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {allOrders.slice(0, displayedOrders).map((order) => (
                                <tbody key={order.id}>
                                    <tr className='admin-orders-content'>
                                        <td data-label="Id">{order.id}</td>
                                        <td data-label="Date">{convertFormatDate(order.order_date)}</td>
                                        <td data-label="User's email">{order.email}</td>
                                        <td data-label="Firstname">{order.first_name}</td>
                                        <td data-label="Lastname">{order.last_name}</td>
                                        <td data-label="Total price">{((order.total_price) / 100).toFixed(2)} €</td>
                                        <td data-label="Status">{order.order_status}</td>
                                        <td data-label="Action">
                                            <Link className='action-1'>
                                                <HiPencilAlt className='admin-btn-update-order' />
                                            </Link>
                                        </td>
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