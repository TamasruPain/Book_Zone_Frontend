import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGraduationCap, faClipboardQuestion, faAddressCard, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { message } from 'antd';

const UserAdmin_Dash = () => {

  const navigate = useNavigate();


  useEffect(() => {
    const checkRole = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://book-zone-mern-app.onrender.com/role/checkRole', {
          headers: { Authorization: token }
        });

        // Check if the role is "ownerAdmin"
        if (response.data.role !== 'User Admin') {
          // Redirect to unauthorized page or handle accordingly
          navigate('/unauthorized');
        }
      } catch (error) {
        // Handle error or redirect to login page
        navigate('/useradminlogin');
      }
    };

    checkRole();
  }, []);

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
        <Link to='/userAdmin_profile' className="btn btn-outline-primary mx-2">
          <FontAwesomeIcon icon={faAddressCard} style={{ color: "#B197FC" }} /> Profile
        </Link>
        <button onClick={handleLogout} className="btn btn-outline-dark mx-2">
          <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
        </button>
      </div>

      <div align='center' className='my-3'>
        <h2>Welcome { }</h2>
        <hr className='rounded my-3' size="5" width="50%" color="red" />
      </div>

      <div align='center' className='my-3'>
        <h5>Your Managements</h5>
      </div>

      <div className='container'>
        <div className='my-5'>
          <div className="row row-cols-1 row-cols-md-4 g-5 p-4">

            <div className="col">
              <Link to="/all_books">
                <div className="card">
                  <div className="card-body">
                    <FontAwesomeIcon icon={faBook} style={{ color: "#B197FC", fontSize: '48px' }} />
                    <label className="card-title mx-3 my-3">Book <br />Management</label>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/all_students">
                <div className="card">
                  <div className="card-body">
                    <FontAwesomeIcon icon={faGraduationCap} style={{ color: "#B197FC", fontSize: '48px' }} />
                    <label className="card-title mx-3 my-3">Students<br /> Management</label>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col">
              <Link to="/manage_query">
                <div className="card">
                  <div className="card-body">
                    <FontAwesomeIcon icon={faClipboardQuestion} style={{ color: "#B197FC", fontSize: '48px' }} />
                    <label className="card-title mx-3 my-3">Queries<br />Management </label>
                  </div>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAdmin_Dash;
