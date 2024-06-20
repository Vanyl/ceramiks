import React, {useState} from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate }  from 'react-router-dom'
import '../sass/auth.scss'


const Register = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    console.log(errors);
    const navigate = useNavigate();
    const [error, setError] = useState(null); // State to store error messages

    const onSubmit = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);

        try {
            const response = await fetch('https://ecommerce-website3333-593ff35538d5.herokuapp.com/auth/register', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const accessToken = await response.json();
                const token = accessToken.token;
                localStorage.setItem('accessToken', token);
                console.log(accessToken.message)
                navigate("/login");
            } else {
                const { error } = await response.json();
                setError(error);
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
                    <h2>REGISTER</h2>
                    <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("first_name", { required: "The first name is required" })} type='text' placeholder='First name'/>
                        <p>{errors.firstname && errors.firstname.message}</p>
                        <input {...register("last_name", { required: "The last name is required" })} type='text' placeholder='Last name'/>
                        <p>{errors.lastname && errors.lastname.message}</p>
                        <input {...register("email", { required: "The email is required" })} type='email' placeholder='Email'/>
                        <p>{errors.email && errors.email.message}</p>
                        <input {...register("password", { required: "The password is required" })} type='password' placeholder='Password'/>
                        <p>{errors.password && errors.password.message}</p>
                        <button className='auth-btn' disabled={isSubmitting} type='submit'>
                            {isSubmitting ? "Loading..." : "CREATE MY ACCOUNT"}
                        </button>
                    </form>
                    <div className='go-login'>
                        <p>Already Have An Account ?</p>
                        <Link to="/login" className='login-link'>Login</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register