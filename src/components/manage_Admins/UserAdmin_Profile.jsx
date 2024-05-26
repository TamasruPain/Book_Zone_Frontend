import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faTrashCan, faPenToSquare, faAddressCard } from '@fortawesome/free-solid-svg-icons';

const UserAdmin_Profile = () => {

  const navigate = useNavigate();

  const [userAdmin, setUserAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userAdminName: '',
    userAdminEmail: '',
    userAdminGender: '',
    userAdminInstitute: ''
  });

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

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://book-zone-mern-app.onrender.com/user/me', {
          headers: { Authorization: token }
        });
        setUserAdmin(response.data);
        setFormData({
          userAdminName: response.data.userAdminName,
          userAdminEmail: response.data.userAdminEmail,
          userAdminGender: response.data.userAdminGender,
          userAdminInstitute: response.data.userAdminInstitute
        });
      } catch (error) {
        alert('You need to login first');
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    axios.get('https://book-zone-mern-app.onrender.com/user/logout')
      .then(res => {
        if (res.data.json) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          navigate('/');
          // Refresh the page after deletion
          window.location.reload();
        }
      }).catch(err => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      const token = localStorage.getItem('token');
      axios.delete(`https://book-zone-mern-app.onrender.com/user/deleteUserAdmin/${userAdmin._id}`, {
        headers: { Authorization: token }
      })
        .then(res => {
          localStorage.removeItem('token');
          navigate('/');
        }).catch(err => {
          console.log(err);
        });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`https://book-zone-mern-app.onrender.com/user/updateUserAdmin/${userAdmin._id}`, formData, {
      headers: { Authorization: token }
    })
      .then(res => {
        setUserAdmin(res.data);
        setIsEditing(false);
      }).catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="my-4" align={'right'}>
        <Link to='/useradmindash' className='btn btn-outline-success mx-2'>
          Go Back
        </Link>
        <button onClick={handleLogout} className="btn btn-outline-dark mx-2">
          <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
        </button>
      </div>

      <div align='center'>
        {userAdmin ? (
          <h4>Welcome {userAdmin.userAdminName}</h4>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className='form-container'>


        <div className=' card p-2 my-4' style={{ height: '440px', width: 'auto' }}  >
          <div className='row g-1'>
            <button className='btn btn-outline-primary col-1 mx-1' style={{ height: 'auto', width: 'auto' }} onClick={handleEdit} align='right'>
              <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#B197FC", fontSize: '18px' }} />
            </button>
            <button className='btn btn-outline-secondary col-1 mx-1' style={{ height: 'auto', width: 'auto' }} onClick={handleDelete} align='right'>
              <FontAwesomeIcon icon={faTrashCan} style={{ color: "#B197FC", fontSize: '18px' }} />
            </button>

            {userAdmin ? (
              <label align={'right'} className='col'>{userAdmin.role} </label>
            ) : (
              <p>Loading...</p>
            )}

          </div>

          {isEditing ? (
            <form onSubmit={handleUpdate}>
              <div className='row g-5 my-2 p-5'>
                <div className='col-md-6'>
                  <input
                    type='text'
                    className='form-control'
                    name='userAdminName'
                    value={formData.userAdminName}
                    onChange={handleChange}
                    placeholder='Name'
                    required
                  />
                </div>
                <div className='col-md-6'>
                  <input
                    type='email'
                    className='form-control'
                    name='userAdminEmail'
                    value={formData.userAdminEmail}
                    onChange={handleChange}
                    placeholder='Email'
                    required
                  />
                </div>
                <div className='col-md-6'>
                  <input
                    type='text'
                    className='form-control'
                    name='userAdminGender'
                    value={formData.userAdminGender}
                    onChange={handleChange}
                    placeholder='Gender'
                    required
                  />
                </div>
                <div className='col-md-6'>
                  <input
                    type='text'
                    className='form-control'
                    name='userAdminInstitute'
                    value={formData.userAdminInstitute}
                    onChange={handleChange}
                    placeholder='Institute'
                    required
                  />
                </div>
              </div>
              <div align={'center'}>
                <button type='submit' className='btn btn-outline-success col-3'>
                  Save
                </button>
                <Link to='/useradmindash' className='btn btn-outline-primary mx-2 col-3'>
                  cancel
                </Link>
              </div>

            </form>

          ) : (
            <div>
              <div className='my-4' align='center' >
                <FontAwesomeIcon icon={faAddressCard} style={{ color: "#B197FC", fontSize: '130px' }} />
              </div>
              {userAdmin ? (
                <div className='row g-3 p-4 my-2'>
                  <p className='col-6'><strong> Name: </strong> <br /> {userAdmin.userAdminName} </p>
                  <p className='col-6'><strong> Email: </strong> <br /> {userAdmin.userAdminEmail} </p>
                  <p className='col-6'><strong> Gender: </strong> <br /> {userAdmin.userAdminGender} </p>
                  <p className='col-6'><strong> Institute: </strong> <br /> {userAdmin.userAdminInstitute} </p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          )}
        </div>

      </div >
    </>
  );
}

export default UserAdmin_Profile;
