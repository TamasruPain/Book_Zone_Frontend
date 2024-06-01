import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { message } from 'antd';

const Navbar = () => {
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkRole = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('https://book-zone-mern-app.onrender.com/role/checkRole', {
                    headers: { Authorization: token }
                });
                setRole(response.data.role);
            } catch (error) {
                console.error(error);
                navigate('/');
            }
        };

        // Execute role check only when Navbar is rendered on its own route
        if (location.pathname === '/') {
            checkRole();
        }
    }, [navigate, location.pathname]);

   
 //logout---------------------------------------------------------------------------
 useEffect(() => {
    const logoutMessage = localStorage.getItem('logoutMessage');
    if (logoutMessage) {
        message.success('You have been logged out successfully!');
        localStorage.removeItem('logoutMessage'); // Clear the flag
    }
}, []);

const handleLogout = () => {
    axios.get('https://book-zone-mern-app.onrender.com/logout')
        .then(res => {
            if (res.status === 200) { // Assuming a status of 200 means success
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.setItem('logoutMessage', 'true'); // Set the flag
                navigate('/'); // Navigate to the homepage
                window.location.reload();
            } else {
                // Handle unexpected response structure
                message.error('Logout failed. Please try again.');
                console.error('Unexpected response:', res);
            }
        }).catch(err => {
            message.error('An error occurred during logout. Please try again.');
            console.error('Logout error:', err);
        });
};
//----------------------------------------------------------------------------------

    
    

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <div>
                            Book Zone
                        </div>
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-2">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/">|</Link>
                            </li>
                            {(role === 'Student' || role === 'Owner Admin' || role ==='User Admin'  ) && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/books">Library</Link>
                                </li>
                            )}
                            {role === 'Owner Admin' && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/owneradmindash">Dashboard</Link>
                                </li>
                            )}
                            {role === 'User Admin' && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/useradmindash">Dashboard</Link>
                                </li>
                            )}
                            {role === 'Student' && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/student_dash">Dashboard</Link>
                                </li>
                            )}
                        </ul>
                        <ul className="navbar-nav mb-2 mb-lg-0 mx-2">
                            {(role === 'Student' || role === 'Owner Admin'  || role ==='User Admin') && (
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn btn-outline-Light mx-2" >
                                        <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
                                    </button>
                                </li>
                            )}
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
