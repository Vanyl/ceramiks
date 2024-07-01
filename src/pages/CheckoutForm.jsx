import { useForm } from "react-hook-form"
import { useState, useEffect } from "react";
import { useNavigate }  from 'react-router-dom'
import '../sass/checkout-form.scss'
import { useAuth } from '../context/authContext.jsx';


function CheckoutForm() {
    const { authState, logout } = useAuth();
    console.log(authState);
    console.log(authState.id);
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [error, setError] = useState(null); // State to store error messages

    const onCheckout = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        //Retrieve the basket contents from localStorage
        const basketContents = JSON.parse(localStorage.getItem('allCartItems')) || [];
        let allData;
        if(authState) {
            allData = {
                ...data,
                data: basketContents,
                user_id: authState.id,
            };
        } else {
            allData = {
                ...data,
                data: basketContents,
            }; 
        }

        console.log(allData);

        try {
            const response = await fetch('https://ecommerce-website3333-593ff35538d5.herokuapp.com/order/create-checkout-session', {
                method: 'POST',
                body: JSON.stringify(allData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                localStorage.setItem('allData', JSON.stringify(allData));
                window.location.href= result.sessionId;
            
                //localStorage.removeItem('allCartItems');
            } else {
                const { error } = await response.json();
                setError(error);
            }
        } catch (error) {
            console.error('Error in the checkout process:', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    }

    return (
        <div className='checkout-container'>
            <h1>Let's checkout</h1>
            <form className='auth-form' onSubmit={handleSubmit(onCheckout)}>
                        <input {...register("first_name", { required: "The first name is required" })} type='text' placeholder='First name'/>
                        <p>{errors.first_name && errors.first_name.message}</p>
                        <input {...register("last_name", { required: "The last name is required" })} type='text' placeholder='Last name'/>
                        <p>{errors.last_name && errors.last_name.message}</p>
                        <input {...register("email", { required: "The email is required" })} type='email' placeholder='Email'/>
                        <p>{errors.email && errors.email.message}</p>
                        <input {...register("shipping_adress", { required: "The adress is required" })} type='text' placeholder='Shipping adress'/>
                        <p>{errors.shipping_adress && errors.shipping_adress.message}</p>
                        <button className='auth-btn' disabled={isSubmitting} type='submit'>
                            {isSubmitting ? "Loading..." : "Pay"}
                        </button>
                    </form>
        </div>
    )
}

export default CheckoutForm;