import '../sass/profile.scss'
import { useForm } from "react-hook-form"
import { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext.jsx';
import { Link } from "react-router-dom"


const Profile = () => {

    const [orders, setOrders] = useState([]);
    const { authState, logout } = useAuth();
    const [updatedAddress, setUpdatedAddress] = useState(localStorage.getItem('adress') || '');
    console.log(authState.token);
    const [isEditedAddress, setIsEditedAddress] = useState(false); //new state to track if address is being edited
    const [isOpenOrderDetails, setIsOpenOrderDetails] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({});
    const [error, setError] = useState(null); //to store error message


    const readOrderDetails = (id) => {
         setIsOpenOrderDetails({
            ...isOpenOrderDetails,
            [id]: !isOpenOrderDetails[id],
          });
        //setIsOpenOrderDetails(!isOpenOrderDetails[id]);
        //document.body.style.display = openOrderDetails ? 'none' : 'flex';
    }

   /*   useEffect(() => {
        document.body.style.flex = isOpenOrderDetails ? 'none' : 'flex';
    }, [isOpenOrderDetails]);  */

    const editAddress = () => {
        setIsEditedAddress(true);
    }

    const handleAddressChange = (e) => {
        setUpdatedAddress(e.target.value);
    }

     const saveAddress = async (data) => {
        console.log(data);
     
        try {
            const response = await fetch(`https://ecommerce-website3333-593ff35538d5.herokuapp.com/user/${authState.id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    shipping_address: data,        //shipping_address: updatedAddress,     
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authState.token}`
                },
            });
        
            //console.log('Response Status:', response.status);

            if (response.ok) {
                const result = await response.json();
                //console.log('Response Body:', result); 
                localStorage.setItem('adress', updatedAddress);
                setIsEditedAddress(false);
            } else {
                const errorResult = await response.json();
                setError(errorResult.message, 'Unauthorized request');
            }
        } catch (error) {
            console.error('Error in the editing address process:', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    }
    
 
    useEffect(() => {
        const fetchOrderData = async () => {    
            try {
                const response = await fetch('https://ecommerce-website3333-593ff35538d5.herokuapp.com/user/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer '+ authState.token

                    },
                });
        
                if (response.ok) {
                    const result = await response.json();
                    console.log(result.orders);
                    setOrders(result.orders);
                } else {
                    const { error } = await response.json();
                    setError(error);
                }
            } catch (error) {
                console.error('Error while getting orders :', error);
                setError('An unexpected error occurred. Please try again later.');
            }
        }

        if (authState.token) {
            fetchOrderData();
        } else {
            setError('User is not authenticated.');
        }

    }, [authState.token]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    }
    
    return (
        <>
            <div className='pattern'>
                <svg
                    className='pattern-svg'
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    // preserveAspectRatio="xMinYMin meet"
                    >
                    <path fill="#e2725b" fillOpacity="1" d="M0,96L24,85.3C48,75,96,53,144,48C192,43,240,53,288,80C336,107,384,149,432,160C480,171,528,149,576,133.3C624,117,672,107,720,138.7C768,171,816,245,864,250.7C912,256,960,192,1008,176C1056,160,1104,192,1152,208C1200,224,1248,224,1296,208C1344,192,1392,160,1416,144L1440,128L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path>
                </svg>
                {/* <svg className='pattern-svg' preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#e2725b" fill-opacity="1" d="M0,192L80,208C160,224,320,256,480,234.7C640,213,800,139,960,138.7C1120,139,1280,213,1360,250.7L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg> */}
                {/* <svg className='pattern-svg' preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#e2725b" fill-opacity="1" d="M0,64L80,96C160,128,320,192,480,197.3C640,203,800,149,960,149.3C1120,149,1280,203,1360,229.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg> */}

            </div>
            <div className='my-account-container'>
                <div className='my-account-section'>

                    <div className="header-account">
                        {/* <div className='logout-link'>LOGOUT</div> */}
                        <Link to='/' className='logout-link links' onClick={logout}>LOGOUT</Link>
                        <h1>my account</h1>
                        <p>Welcome back, {authState.username} !</p>
                    </div>
                    <div className='bottom-account'>
                        <div className="my-orders">
                            <h2>my orders</h2>
                           {/*  {error && <p className="error">{error}</p>} */}
                            {orders.length > 0 ? (
                                <div className='my-orders-block'>
                                    {orders.map((order, index) => (
                                        <div className= 'orders-container' key={index}>
                                            <div className='order-header' onClick={() => readOrderDetails(order.id)}>
                                                <p>Order {index + 1}</p>
                                                <p>On {formatDate(order.order_date)}</p>
                                            </div>
                                          
                                            <div className={`orders-list ${isOpenOrderDetails[order.id]  ? 'open': ''}`}>
                                                     {order.Order_items.map((detail, i) => (
                                                        <div className='details-1' key={i}>
                                                             <div>Quantity: {detail.quantity}</div> 
                                                            <div>Item: {detail.item.name}</div> 
                                                        </div>
                                                     ))} 
                                               {/*   { console.log(order.Order_items)}  */}
                                                    <div className='details-2'>
                                                        <div>Total: {((order.total_price)/100).toFixed(2)} €</div>
                                                        <div>Status: {order.order_status}</div>
                                                    </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                ) : (
                                <p>No orders found.</p>
                            )}
                        </div>
                        <div className="my-address">
                            <h2>primary address</h2>
                            { isEditedAddress ? (
                                <div className='address-info'>
                                    <form className='auth-form' onSubmit={handleSubmit(saveAddress)}>
                                        <input 
                                            {...register("shipping_adress")}
                                            type="text" 
                                            value={updatedAddress} 
                                            onChange={handleAddressChange} 
                                        />
                                        <button disabled={isSubmitting} type='submit'>
                                                {isSubmitting ? "Loading..." : "Save"}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                             <div>
                                { updatedAddress != '' ? (
                                    <div>
                                        <p className='account-address'>{updatedAddress}</p>
                                        <button onClick={editAddress}>edit address</button>
                                    </div>
                                ) : (
                                    <div>
                                        <p className='account-address'>Add an address</p>
                                        <button onClick={editAddress}>add address</button>
                                    </div>
                                )}
                             </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile