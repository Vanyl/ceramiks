import '../sass/admin-dashboard.scss'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext.jsx';
import AdminItems from '../components/AdminDashBoard/AdminItems.jsx'
import AdminCollections from '../components/AdminDashBoard/AdminCollections.jsx'
import AdminUsers from '../components/AdminDashBoard/AdminUsers.jsx'
import AdminOrders from '../components/AdminDashBoard/AdminOrders.jsx'

const AdminDashBoard = () => {
    //security seul admin a access to this route
    const [activeSection, setActiveSection] = useState('welcome');
    const [showMobileNav, setShowMobileNav] = useState(false);
    const navigate = useNavigate();
    const { authState, logout } = useAuth();


    const toggleMobileNav = () => {
        setShowMobileNav(!showMobileNav);
    };

    useEffect(() => {
        if (!authState.is_admin) {
            navigate('/'); // Redirect to home or another page if not admin
        }
    }, [authState, navigate]);

    return (
        <div>
            {authState.is_admin ? (
                <>
                    <nav className="dashboard-nav">
                        <button className="toggle-button" onClick={toggleMobileNav}>Admin Dashboard</button>
                        <ul className={`nav-links ${showMobileNav ? 'show' : ''}`}>
                            <li><p onClick={() => setActiveSection('admin-items')}>All Items</p></li>
                            <li><p onClick={() => setActiveSection('admin-collections')}>All Collections</p></li>
                            <li><p onClick={() => setActiveSection('admin-users')}>All Users</p></li>
                            <li><p onClick={() => setActiveSection('admin-orders')}>All Orders</p></li>
                        </ul>
                    </nav>
                    <div>
                        <h1>Welcome admin</h1>
                        {activeSection === 'welcome' && (<h1>Welcome Admin</h1>)}
                        {activeSection === 'admin-items' && (<AdminItems />)}
                        {activeSection === 'admin-collections' && (<AdminCollections />)}
                        {activeSection === 'admin-users' && (<AdminUsers />)}
                        {activeSection === 'admin-orders' && (<AdminOrders />)}
                    </div>
                </>
            ) : (
                <p>Redirecting...</p>
            )}
        </div>
    );
}

export default AdminDashBoard;