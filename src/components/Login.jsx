import React, {useState} from 'react'
import { useForm } from "react-hook-form"
import { Link }  from 'react-router-dom'
import '../sass/auth.scss'


const Login = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    console.log(errors);
    const onSubmit = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
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