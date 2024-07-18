import { useForm } from "react-hook-form"
import { useState, useEffect, useContext } from "react";
import { useNavigate }  from 'react-router-dom'
import '../sass/checkout-form.scss'
import { useAuth } from '../context/authContext.jsx';
import { ItemsContext } from "../context/itemsContext";



function CheckoutForm() {
    const { authState } = useAuth();
    const { allItems } = useContext(ItemsContext);
    console.log(allItems.Objets);
    console.log(authState);
    console.log(authState.id);
    let firstname = localStorage.getItem('firstname');
    let lastname = localStorage.getItem('lastname');
    let email = localStorage.getItem('email');
    let adress = localStorage.getItem('adress');

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            first_name: firstname || '',
            last_name: lastname || '',
            email: email || '',
            shipping_adress: adress || ''
        }
    });

    const [error, setError] = useState(null); // State to store error messages
     //Retrieve the basket contents from localStorage
     const basketContents = JSON.parse(localStorage.getItem('allCartItems')) || [];
     console.log(basketContents);

     const totalAmount = basketContents.reduce((total, item) => total + (item.price * item.quantity), 0) / 100;


    const onCheckout = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

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
            <div className="infos">
                <form className='checkout-form' onSubmit={handleSubmit(onCheckout)}>
                    <input {...register("first_name", { required: "The first name is required" })} type='text' placeholder='First name' />
                    <p>{errors.first_name && errors.first_name.message}</p>
                    <input {...register("last_name", { required: "The last name is required" })} type='text' placeholder='Last name'/>
                    <p>{errors.last_name && errors.last_name.message}</p>
                    {authState.token ? (
                        <>
                            <input {...register("email", { required: "The email is required" })} type='email' placeholder='Email' disabled/>
                            <p>{errors.email && errors.email.message}</p>
                        </>
                    ) : (
                        <>
                            <input {...register("email", { required: "The email is required" })} type='email' placeholder='Email' />
                            <p>{errors.email && errors.email.message}</p>
                        </>
                    )}
                    <input {...register("shipping_adress", { required: "The adress is required" })} type='text' placeholder='Shipping adress'/>
                    <p>{errors.shipping_adress && errors.shipping_adress.message}</p>
                    <button className='checkout-btn' disabled={isSubmitting} type='submit'>
                        {isSubmitting ? "Loading..." : "Pay"}
                    </button>
                </form>
                <div className="overview-basket">
                    <div className="items-container-checkout">
                        {basketContents.map((basketItem, index) => (
                            <div key={index} className="item">
                                <div className="info-order">
                                    <img src={basketItem.Items_img.find(img => img.is_main)?.image_url} alt="product's image" />
                                    <p className="item-count">{basketItem.quantity}</p>
                                    <p>{basketItem.name}</p>
                                    <p>{(basketItem.price * basketItem.quantity / 100).toFixed(2)} €</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="total">
                        <div className="part-1">
                            <p>TOTAL</p>
                        </div>
                        <div className="part-2">
                            <p>EUR <span>{totalAmount.toFixed(2)} €</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutForm;