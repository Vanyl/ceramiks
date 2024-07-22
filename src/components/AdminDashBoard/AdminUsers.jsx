import { useState, useEffect, useContext } from "react"
import { useAuth } from '../../context/authContext.jsx';
import '../../sass/admin-users.scss'

const AdminUsers = () => {
    const { authState } = useAuth();
    const [allUsers, setAllUsers] = useState([]);
    const [error, setError] = useState(null); //to store error message
    const [displayedUsers, setDisplayedUsers] = useState(10)

    useEffect(() => {
        const getAllUsers = async () => {
            // e.preventDefault();
            try {
                const response = await fetch('https://ecommerce-website3333-593ff35538d5.herokuapp.com/admin/user/all ', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authState.token}`
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log(result.users)
                    setAllUsers(result.users)

                }
                else {
                    const { error } = await response.json();
                    setError(error);
                }
            } catch (error) {
                console.error('Error while getting users :', error);
                setError('An unexpected error occurred. Please try again later.');
            }
        };
        if (authState.is_admin === true) {
            getAllUsers();
        } else {
            setError('Restricted Access ! Not an admin or login as admin.');
        }
    }, [authState.token, authState.is_admin]);

    const loadMoreUsers = () => {
        setDisplayedUsers(displayedUsers + 10);
    };



    return (
        <div className="admin-users-container">
            <h1 className='title-all-users'>AlL users</h1>
            {error ? <p>{error}</p> : (
                <div>
                    <div className="admin-users-list">
                        <table className='users-table'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>User's email</th>
                                    <th>Firstname</th>
                                    <th>Lastname</th>
                                    <th>Shipping Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allUsers.slice(0, displayedUsers).map((user) => (
                                    <tr className='admin-users-content' key={user.id}>
                                        <td data-label="Id">{user.id}</td>
                                        <td data-label="Email">{user.email}</td>
                                        <td data-label="Firstname">{user.first_name}</td>
                                        <td data-label="Lastname">{user.last_name}</td>
                                        <td data-label="Address">{user.shipping_adress || 'No address assigned yet'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='btn-loadMore'>
                    {displayedUsers < allUsers.length && (
                        <button className='btn-loadMore' onClick={loadMoreUsers}>Load More</button>
                    )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminUsers