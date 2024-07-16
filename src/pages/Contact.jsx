import { useForm } from "react-hook-form";
import { useRef, useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import '../sass/contact.scss'

const Contact = () => {
    const form = useRef();
    const [successMessage, setSuccessMessage] = useState('');
    const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    });
    const sendEmail = (data, e) => {
        e.preventDefault();

        //email send to 'Ceramics' with the user's message
        emailjs
            .sendForm(
                'service_ju5bs1o',
                'contact_form_test',
                form.current, {
                publicKey: 'user_LMZVqBRF59yBQzujU8r2t',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    setSuccessMessage('Your message has been sent successfully!');
                    reset();
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );

        //if we want to send an email to the user we would need a second email template from emailjs
    };

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    return (
        <div className="contact-container">
            <h1>Contact us</h1>
            <form ref={form} className="contact-form" onSubmit={handleSubmit(sendEmail)}>
                <div className="name-container">
                    <div className="name-left">
                        <label>First name </label>
                        <input {...register("first_name", { required: "The first name is required" })} type='text' name='first_name' placeholder='First name' />
                        {errors.first_name && <p>{errors.first_name.message}</p>}
                    </div>
                    <div className="name-right">
                        <label>Last name </label>
                        <input {...register("last_name", { required: "The last name is required" })} type='text' name='last_name' placeholder='Last name' />
                        {errors.last_name && <p>{errors.last_name.message}</p>}
                    </div>
                </div>
                <label>Email </label>
                <input {...register("email", { required: "The email is required" })} type='email' name='email' placeholder='Email' />
                {errors.email && <p>{errors.email.message}</p>}
                <label>Message </label>
                <textarea {...register("message", { required: "The message is required", minLength: { value: 20, message: "Minimum length is 20 characters" } })} name='message' placeholder='Write your message...'></textarea>
                {errors.message && <p>{errors.message.message}</p>}
                <button type="submit" className="contact-btn" disabled={isSubmitting}>Send message</button>
                {successMessage ? <p>{successMessage}</p> : null}
            </form>
        </div>
    );
}

export default Contact;