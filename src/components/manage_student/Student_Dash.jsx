import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGraduationCap, faArrowRightFromBracket, faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
import { message } from 'antd';

const Student_Dash = () => {

  const navigate = useNavigate();

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
      <div className='mx-2 my-3' align='right'>
        <button onClick={handleLogout} className="btn btn-outline-dark mx-2">
          <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
        </button>
      </div>

      <div align='center' className='my-'>
        <h2>Welcome Student</h2>
        <hr className='rounded my-2' size="5" width="50%" color="red" />
      </div>
      <div align='center'>
        <h5>Let's do some Study</h5>
      </div>

      <div className='container'>
        <div className='my-5'>
          <div className="row row-cols-1 row-cols-md-4 g-5 p-4">

            <div className="col">
              <Link to="/books">
                <div className="card">
                  <div className="card-body">
                    <FontAwesomeIcon icon={faBook} style={{ fontSize: '48px' }} />
                    <label className="card-title mx-3 my-3">Books<br />For You </label>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/student_profile">
                <div className="card">
                  <div className="card-body">
                    <FontAwesomeIcon icon={faGraduationCap} style={{ fontSize: '48px' }} />
                    <label className="card-title mx-3 my-3">Student<br /> Details</label>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/makeQuery">
                <div className="card">
                  <div className="card-body">
                    <FontAwesomeIcon icon={faClipboardQuestion} style={{ fontSize: '48px' }} />
                    <label className="card-title mx-3 my-3">Make<br />Query</label>
                  </div>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Student_Dash
