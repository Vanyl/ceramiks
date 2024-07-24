import { useEffect, useState, useContext } from "react";
import { useNavigate }  from 'react-router-dom';
import '../sass/success.scss';
import { MdOutlineCancel } from "react-icons/md";
import { ItemsContext } from '../context/itemsContext';


function Cancel() {
   // const { cartItems } = useContext(ItemsContext);
    const [counter, setCounter] = useState(10);
    const navigate = useNavigate();
    let myCart = localStorage.getItem('allCartItems');
    let myData = localStorage.getItem('allData');
    useEffect(() => {
        /* if (!cartItems || cartItems.length === 0) {     // If no purchase data is found, redirect to the homepage or another appropriate route
            return navigate("/", { replace: true });
        }  */

        if (myCart && myData) {
            localStorage.removeItem('allData');
            localStorage.removeItem('allCartItems');
        }

        if (counter > 0) {
            const timer = setTimeout(() => setCounter(counter - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            navigate("/", { replace: true });
            window.location.reload();
        }
    }, [counter, navigate]); 
  
   
    return (
        <>
            <div className='cancel-container'>
                <div className='success-container'>
                    <div className='success-message'>
                        <h1 className='title-success'>Cancel</h1>
                        <MdOutlineCancel  className='no-check-icon' />
                        <p className='success-congrats'>Oupsss</p>
                        <p className='cancel-info-message'>Your payement has not been accepted ! The process has been canceled !</p>
                        <p>You'll be redirected to the homepage in 00:00:{counter}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cancel;