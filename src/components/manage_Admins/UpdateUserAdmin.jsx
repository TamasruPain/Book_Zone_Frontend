import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';


const UpdateUserAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [adminData, setAdminData] = useState({
    userAdminName: '',
    userAdminEmail: '',
    userAdminGender: '',
    userAdminPassword: '',
    userAdminInstitute: '',
  });


  useEffect(() => {
    const checkRole = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://book-zone-backend.onrender.com/role/checkRole', {
          headers: { Authorization: token }
        });

        // Check if the role is "ownerAdmin"
        if (response.data.role !== 'Owner Admin') {
          // Redirect to unauthorized page or handle accordingly
          navigate('/unauthorized');
        }
      } catch (error) {
        // Handle error or redirect to login page
        navigate('/');
      }
    };

    checkRole();
  }, []);

  useEffect(() => {
    axios.get(`https://book-zone-backend.onrender.com/user/userAdmin/${id}`)
      .then(result => {
        console.log(result);
        const data = result.data;
        setAdminData({
          ...adminData,
          userAdminName: data.userAdminName || '',
          userAdminEmail: data.userAdminEmail || '',
          userAdminGender: data.userAdminGender || '',
          userAdminPassword: '',
          userAdminInstitute: data.userAdminInstitute || '',
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://book-zone-backend.onrender.com/user/updateUserAdmin/${id}`, adminData)
      .then(result => {
        console.log(result);
        navigate(-1);
      })
      .catch(err => console.log(err));
  };


  return (
    <div>
      <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className='bg-white p-4 rounded w-50'>
          <div align='right'>
            <Link to='/useradmins' className='btn btn-outline-primary'><FontAwesomeIcon icon={faAnglesLeft} /></Link>
          </div>
          <h2 className='container d-flex justify-content-center align-items-center'>Update User Admin</h2>

          <form className="row g-3" onSubmit={handleUpdate}>

            <div className="col-6">
              <label className="form-label" htmlFor="userAdminName">User Admin Name</label>
              <input type="text" placeholder='Enter the Full Name' id="userAdminName" className="form-control"
                name="userAdminName" value={adminData.userAdminName} onChange={handleInputChange} />
            </div>

            <div className="col-6">
              <label className="form-label" htmlFor="userAdminEmail">Email Address</label>
              <input type="email" placeholder='Email Address' id="userAdminEmail" className="form-control"
                name="userAdminEmail" value={adminData.userAdminEmail} onChange={handleInputChange} required />
            </div>

            <div className="col-6">
              <label className="form-label" htmlFor="userAdminGender">Gender</label>
              <input type="text" id="userAdminGender" placeholder='Gender' className="form-control"
                name="userAdminGender" value={adminData.userAdminGender} onChange={handleInputChange} />
            </div>

            <div className="col-6">
              <label className="form-label" htmlFor="userAdminPassword">Password</label>
              <input type="password" placeholder='Password' id="userAdminPassword" className="form-control"
                name="userAdminPassword" value={adminData.userAdminPassword} onChange={handleInputChange} required />
            </div>

            <div className="col-12 justify-content-center align-items-center d-flex">
              <button type="submit" className="btn btn-outline-primary my-3 w-50">Update User Admin</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default UpdateUserAdmin;
