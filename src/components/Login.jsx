import React, {useState} from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate }  from 'react-router-dom'
import '../sass/auth.scss'
import { useAuth } from '../context/authContext.jsx';


const Login = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    console.log(errors);
    const [error, setError] = useState(null); // State to store error messages
    const navigate = useNavigate();
    const { login } = useAuth();

    const onSubmit = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);

        try {
            const response = await fetch('https://ecommerce-website3333-593ff35538d5.herokuapp.com/auth/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(data);
            console.log(response);
            if (response.ok) {
                const  result  = await response.json();
                console.log(result);
                const token = result.accessToken;
                const userConnected = result.user.first_name +" "+result.user.last_name;
                const userId = result.user.id;
                const adress = result.user.shipping_adress;
                const first_name = result.user.first_name;
                const last_name = result.user.last_name;
                const email = result.user.email;
                const is_admin = result.user.is_admin;
                login(token, userConnected, userId, adress, first_name, last_name, email, is_admin);
                navigate("/")

            } else {
                const { error } = await response.json();
                setError(error);
                navigate("/login");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('An unexpected error occurred. Please try again later.');
        }
    }

    return (
        <>  
            <div className='page-container'>
                <div className='auth-container'>   
                    <h2>LOGIN</h2>
                    <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("email", { required: "The email is required" })} type='email' placeholder='Email' />
                        <p>{errors.email && errors.email.message}</p>
                        <input {...register("password", { required: "The password is required" })} type='password' placeholder='Password'/>
                        <p>{errors.password && errors.password.message}</p>
                        <button className='auth-btn' disabled={isSubmitting} type='submit'>
                            {isSubmitting ? "Loading..." : "LOGIN"}
                        </button>
                    </form>
                    <Link to="#" className='forgot-pwd'>Forgot Your Password ?</Link>
                    <div className='create-account'>
                        <p>Don't have an account ?</p>
                        <Link to="/register" className='signup-link'>Sign Up</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login