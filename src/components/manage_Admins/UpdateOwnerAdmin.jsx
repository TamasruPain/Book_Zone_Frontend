import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faTrashCan, faPenToSquare, faAddressCard, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

const UpdateOwnerAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [adminData, setAdminData] = useState({
    ownerAdminName: '',
    ownerAdminEmail: '',
    ownerAdminGender: '',
  });


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
        navigate('/');
      }
    };

    checkRole();
  }, []);

  useEffect(() => {
    axios.get(`https://book-zone-mern-app.onrender.com/owner/ownerAdmin/${id}`)
      .then(result => {
        console.log(result);
        const data = result.data;
        setAdminData({
          ...adminData,
          ownerAdminName: data.ownerAdminName || '',
          ownerAdminEmail: data.ownerAdminEmail || '',
          ownerAdminGender: data.ownerAdminGender || ''
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
    axios.put(`https://book-zone-mern-app.onrender.com/owner/updateOwnerAdmin/${id}`, adminData)
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
            <Link to='/owneradmins' className='btn btn-success'>Go Back</Link>
          </div>
          <h2 className='container d-flex justify-content-center align-items-center'>Update Owner Admin</h2>

          <form className="row g-3" onSubmit={handleUpdate}>

            <div className="col-6">
              <label className="form-label" htmlFor="ownerAdminName">Owner Admin Name</label>
              <input type="text" placeholder='Enter the Full Name' id="ownerAdminName" className="form-control"
                name="ownerAdminName" value={adminData.ownerAdminName} onChange={handleInputChange} />
            </div>

            <div className="col-6">
              <label className="form-label" htmlFor="ownerAdminEmail">Email Address</label>
              <input type="email" placeholder='Email Address' id="ownerAdminEmail" className="form-control"
                name="ownerAdminEmail" value={adminData.ownerAdminEmail} onChange={handleInputChange} required />
            </div>

            <div className="col-6">
              <label className="form-label" htmlFor="ownerAdminGender">Gender</label>
              <input type="text" id="ownerAdminGender" placeholder='Institute' className="form-control"
                name="ownerAdminGender" value={adminData.ownerAdminGender} onChange={handleInputChange} />
            </div>

            <div className="col-12 justify-content-center align-items-center d-flex">
              <button type="submit" className="btn btn-outline-primary my-3 w-50">Update Owner Admin</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default UpdateOwnerAdmin;
