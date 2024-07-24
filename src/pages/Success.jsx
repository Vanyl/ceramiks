import { useEffect, useState, useContext } from "react";
import { useNavigate }  from 'react-router-dom'
import '../sass/success.scss';
import { FaRegCircleCheck } from "react-icons/fa6";
import { ItemsContext } from '../context/itemsContext';


function Success() {

    //const { cartItems } = useContext(ItemsContext);
    const cart = localStorage.getItem("allCartItems");
    const [counter, setCounter] = useState(15);
    const navigate = useNavigate();

    const postDataToDB = async () => {
        const dataToSend = JSON.parse(localStorage.getItem('allData')) || [];

        const response = await fetch(
            'https://ecommerce-website3333-593ff35538d5.herokuapp.com/order/completed', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();
            localStorage.removeItem('allData');
            localStorage.removeItem('allCartItems');
           // window.location.reload();
            
          /*  let successTimer = setTimeout(() => {
                if(authToken) {
                    navigate("/", { replace: true });  //replace:true is to avoid to navigate back to previous page
                    window.location.reload();

                    if (counter > 0) {
                        const timer = setTimeout(() => setCounter(counter - 1), 1000);
                        return () => clearTimeout(timer); // Cleanup timer on component unmount or counter change
                    }
                }

            }, 30000); 

            return successTimer;
            clearTimeout(successTimer); */
        }
    }

    useEffect(() => {
        postDataToDB();
        console.log("hellloooooooooo, This is a SUCCESS !!!");
    }, []);

     useEffect(() => {
        if (!cart || cart.length === 0) {
            // If no purchase data is found, redirect to the homepage
            return navigate("/", { replace: true });
        }

        if (counter > 0) {
            const timer = setTimeOut(() => setCounter(counter - 1), 1000);
            return () => clearTimeOut(timer);
        } else {
            navigate("/", { replace: true });
            window.location.reload();
        }
    }, [counter, navigate, cart]);  //the useEffect re-run each time when counter changes //not necessary to add the navigate but it is better for good practice.


    return (
        <>
            <div className='success-container'>
                <div className='success-message'>
                    <h1 className='title-success'>Success</h1>
                    <FaRegCircleCheck  className='check-icon' />
                    <p className='success-congrats'>Congrats</p>
                    <p>Your payement has been accepted !</p>
                    <p>You'll be redirected to the homepage after 00:00:{counter}</p>
                </div>
            </div>
        </>
    )
}

export default Success;