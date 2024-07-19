import '../sass/admin-dashboard.scss'
import { useState } from 'react'
import AdminItems from '../components/AdminDashBoard/AdminItems.jsx'
import AdminCollections from '../components/AdminDashBoard/AdminCollections.jsx'
import AdminUsers from '../components/AdminDashBoard/AdminUsers.jsx'
import AdminOrders from '../components/AdminDashBoard/AdminOrders.jsx'

const AdminDashBoard = () => {
    //security seul admin a access to this route
    const [activeSection, setActiveSection] = useState('');
    const [showMobileNav, setShowMobileNav] = useState(false);

    const toggleMobileNav = () => {
        setShowMobileNav(!showMobileNav);
    };

    return (
        <div style={{ marginBottom: '300px' }}>
            <nav className="dashboard-nav">
                <button className="toggle-button" onClick={toggleMobileNav}>Admin Dashboard</button>
                <ul className={`nav-links ${showMobileNav ? 'show' : ''}`}>
                    <li><button onClick={() => setActiveSection('admin-items')}>All Items</button></li>
                    <li><button onClick={() => setActiveSection('admin-collections')}>All Collections</button></li>
                    <li><button onClick={() => setActiveSection('admin-users')}>All Users</button></li>
                    <li><button onClick={() => setActiveSection('admin-orders')}>All Orders</button></li>
                </ul>
            </nav>
            <div>
                {activeSection === 'admin-items' && (
                    <AdminItems />
                )}
                {activeSection === 'admin-collections' && (
                    <AdminCollections />
                )}
                {activeSection === 'admin-users' && (
                    <AdminUsers />
                )}
                {activeSection === 'admin-orders' && (
                    <AdminOrders />
                )}
            </div>
        </div>
    );
}

export default AdminDashBoard;