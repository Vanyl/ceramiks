import { useEffect } from "react";
import { useNavigate }  from 'react-router-dom'


function Success() {

    const postDataToDB = async () => {
        const dataToSend = JSON.parse(localStorage.getItem('allData')) || [];

        //console.log(dataToSend);

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
            //console.log(result);
            localStorage.removeItem('allData');
            localStorage.removeItem('allCartItems');
        }
    }

    useEffect(() => {
        postDataToDB();
        console.log("hellloooooooooo, This is a SUCCESS !!!");
     }, []);

    return (
        <div className='home-container'>
           <h1>Sucsess</h1>
        </div>
    )
}

export default Success;