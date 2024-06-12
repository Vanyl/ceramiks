import React, {useState} from 'react'
import { useForm } from "react-hook-form"
import { Link }  from 'react-router-dom'
import '../sass/auth.scss'


const Register = () => {
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
                    <h2>REGISTER</h2>
                    <form className='auth-form' onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("firstname", { required: "The first name is required" })} type='text' placeholder='First name'/>
                        <p>{errors.firstname && errors.firstname.message}</p>
                        <input {...register("lastname", { required: "The last name is required" })} type='text' placeholder='Last name'/>
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