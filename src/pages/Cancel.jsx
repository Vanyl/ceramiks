import { useEffect, useState } from "react";
import { useNavigate }  from 'react-router-dom'
import '../sass/success.scss';
import { MdOutlineCancel } from "react-icons/md";


function Cancel() {

  
   
    return (
        <>
            <div className='cancel-container'>
                <div className='success-container'>
                <div className='success-message'>
                    <h1 className='title-success'>Cancel</h1>
                    <MdOutlineCancel  className='no-check-icon' />
                    <p className='success-congrats'>Oupsss</p>
                    <p>Your payement has not been accepted !</p>
                    <p>The process has been canceled !</p>
                </div>
            </div>
            </div>
        </>
    )
}

export default Cancel;