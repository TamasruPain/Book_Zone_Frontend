import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faTrashCan, faPenToSquare, faAddressCard, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

const OwnerAdmin_Profile = () => {

  const navigate = useNavigate();

  const [ownerAdmin, setOwnerAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    ownerAdminName: '',
    ownerAdminEmail: '',
    ownerAdminGender: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://book-zone-mern-app.onrender.com/owner/me', {
          headers: { Authorization: token }
        });
        setOwnerAdmin(response.data);
        setFormData({
          ownerAdminName: response.data.ownerAdminName,
          ownerAdminEmail: response.data.ownerAdminEmail,
          ownerAdminGender: response.data.ownerAdminGender
        });
      } catch (error) {
        alert('You need to login first');
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const checkRole = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://book-zone-mern-app.onrender.com/role/checkRole', {
          headers: { Authorization: token }
        });

        // Check if the role is "ownerAdmin"
        if (response.data.role !== 'Owner Admin') {
          // Redirect to unauthorized page or handle accordingly
          navigate('/unauthorized');
        }
      } catch (error) {
        // Handle error or redirect to login page
        navigate('/owneradminlogin');
      }
    };

    checkRole();
  }, []);

  const handleLogout = () => {
    axios.get('https://book-zone-mern-app.onrender.com/owner/logout')
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
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      const token = localStorage.getItem('token');
      axios.delete(`https://book-zone-mern-app.onrender.com/owner/deleteOwnerAdmin/${ownerAdmin._id}`, {
        headers: { Authorization: token }
      })
        .then(res => {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
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
    axios.put(`https://book-zone-mern-app.onrender.com/owner/updateOwnerAdmin/${ownerAdmin._id}`, formData, {
      headers: { Authorization: token }
    })
      .then(res => {
        setOwnerAdmin(res.data);
        setIsEditing(false);
      }).catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="my-4" align={'right'}>
        <Link to='/owneradmindash' className='btn btn-outline-primary mx-2'>
          <FontAwesomeIcon icon={faAnglesLeft} style={{ fontSize: '20px' }} />
        </Link>
        <button onClick={handleLogout} className="btn btn-outline-dark mx-2">
          <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
        </button>
      </div>

      <div align='center' className='my-3'>
        {ownerAdmin ? (
          <h4>Welcome {ownerAdmin.ownerAdminName}</h4>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className='form-container'>


        <div className=' card p-2 my-4' style={{ height: 'auto', width: 'auto' }}  >
          <div className='row g-1'>
            <button className='btn btn-outline-primary col-1 mx-1' style={{ height: 'auto', width: 'auto' }} onClick={handleEdit} align='right'>
              <FontAwesomeIcon icon={faPenToSquare} style={{ color: "#B197FC", fontSize: '18px' }} />
            </button>
            <button className='btn btn-outline-secondary col-1 mx-1' style={{ height: 'auto', width: 'auto' }} onClick={handleDelete} align='right'>
              <FontAwesomeIcon icon={faTrashCan} style={{ color: "#B197FC", fontSize: '18px' }} />
            </button>

            {ownerAdmin ? (
              <label align={'right'} className='col'>{ownerAdmin.role} </label>
            ) : (
              <p>Loading...</p>
            )}

          </div>

          {isEditing ? (

            <form onSubmit={handleUpdate}>
              <div className='row g-4 my-2 p-4'>
                <div className='col-md-6'>
                  <input
                    type='text'
                    className='form-control'
                    name='ownerAdminName'
                    value={formData.ownerAdminName}
                    onChange={handleChange}
                    placeholder='Name'
                    required
                  />
                </div>
                <div className='col-md-6'>
                  <input
                    type='email'
                    className='form-control'
                    name='ownerAdminEmail'
                    value={formData.ownerAdminEmail}
                    onChange={handleChange}
                    placeholder='Email'
                    required
                  />
                </div>
                <div className='col-md-6'>
                  <input
                    type='text'
                    className='form-control'
                    name='ownerAdminGender'
                    value={formData.ownerAdminGender}
                    onChange={handleChange}
                    placeholder='Gender'
                    required
                  />
                </div>
              </div>
              <div align={'center'}>
                <button type='submit' className='btn btn-outline-success mx-2 col-3'>
                  Save
                </button>
                <Link to='/owneradmindash' className='btn btn-outline-primary mx-2 col-3'>
                  cancel
                </Link>
              </div>

            </form>

          ) : (
            <div>
              <div className='my-4' align='center' >
                <FontAwesomeIcon icon={faAddressCard} style={{ color: "#004cff", fontSize: '130px' }} />
              </div>
              {ownerAdmin ? (
                <div className='row g-3 p-4 my-4'>
                  <p className='col-6'><strong> Name: </strong> <br /> {ownerAdmin.ownerAdminName} </p>
                  <p className='col-6'><strong> Email: </strong> <br /> {ownerAdmin.ownerAdminEmail} </p>
                  <p className='col-6'><strong> Gender: </strong> <br /> {ownerAdmin.ownerAdminGender} </p>
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

export default OwnerAdmin_Profile;
