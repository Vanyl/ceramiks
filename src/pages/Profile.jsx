import '../sass/profile.scss'
import { useState } from 'react'

const Profile = () => {

    const [orders, setOrders] = useState('')

    return (
        <>
            <div className='pattern'>
                <svg
                    className='pattern-svg'
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    // preserveAspectRatio="xMinYMin meet"
                    >
                    <path fill="#e2725b" fillOpacity="1" d="M0,96L24,85.3C48,75,96,53,144,48C192,43,240,53,288,80C336,107,384,149,432,160C480,171,528,149,576,133.3C624,117,672,107,720,138.7C768,171,816,245,864,250.7C912,256,960,192,1008,176C1056,160,1104,192,1152,208C1200,224,1248,224,1296,208C1344,192,1392,160,1416,144L1440,128L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"></path>
                </svg>
                {/* <svg className='pattern-svg' preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#e2725b" fill-opacity="1" d="M0,192L80,208C160,224,320,256,480,234.7C640,213,800,139,960,138.7C1120,139,1280,213,1360,250.7L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg> */}
                {/* <svg className='pattern-svg' preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#e2725b" fill-opacity="1" d="M0,64L80,96C160,128,320,192,480,197.3C640,203,800,149,960,149.3C1120,149,1280,203,1360,229.3L1440,256L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg> */}

            </div>
            <div className='my-account-container'>
                <div className='my-account-section'>

                    <div className="header-account">
                        <div className='logout-link'>logout</div>
                        <h1>my account</h1>
                        <p>Welcome back, name!</p>
                    </div>
                    <div className='bottom-account'>
                        <div className="my-orders">
                            <h2>my orders</h2>
                            <div>{orders ? { orders } : (<p>You haven't placed any orders yet</p>)}</div>
                        </div>
                        <div className="my-address">
                            <h2>primary address</h2>
                            <p className='account-address'>address</p>
                            <button>edit address</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile