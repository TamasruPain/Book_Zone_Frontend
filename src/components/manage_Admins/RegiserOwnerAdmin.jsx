import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterOwnerAdmin = () => {
  const [ownerAdminData, setOwnerAdminData] = useState({
    ownerAdminName: '',
    ownerAdminEmail: '',
    ownerAdminPassword: '',
    ownerAdminGender: '',
  });

  const navigate = useNavigate();


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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwnerAdminData({ ...ownerAdminData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://book-zone-mern-app.onrender.com/owner/addowneradmin", ownerAdminData);
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
        <div className='d-flex justify-content-center align-items-center' style={{ height: '600px' }} >
            <div className='form-container card p-4' style={{ height: '500px', width: '400px' }}  >

          <div align='right'>
            <Link to='/owneradmins' className='btn btn-success'>Go Back</Link>
          </div>
          <h2 className='container d-flex justify-content-center align-items-center'>Owner Admin Details</h2>

          <form className="row g-3 my-3" onSubmit={handleSubmit}>

            <div className="col-6">
              <label className="form-label" htmlFor="ownerAdminName"><b>Owner Admin Name</b></label>
              <input type="text" placeholder='Enter Full Name' id="ownerAdminName" className="form-control"
                name="ownerAdminName" value={ownerAdminData.ownerAdminName} onChange={handleChange} required />
            </div>

            <div className="col-6">
              <label className="form-label" htmlFor="ownerAdminEmail"><b>Email Address</b></label>
              <input type="email" placeholder='Email Address' id="ownerAdminEmail" className="form-control"
                name="ownerAdminEmail" value={ownerAdminData.ownerAdminEmail} onChange={handleChange} required />
            </div>

            <div className="col-6">
              <label className="form-label" htmlFor="ownerAdminPassword"><b>Password</b></label>
              <input type="password" placeholder='Password' id="ownerAdminPassword" className="form-control"
                name="ownerAdminPassword" value={ownerAdminData.ownerAdminPassword} onChange={handleChange} required />
            </div>

            <div className="col-6">
              <label className="form-label" htmlFor="ownerAdminGender"><b>Gender</b></label>
              <input type="Gender" placeholder='Gender' id="ownerAdminGender" className="form-control"
                name="ownerAdminGender" value={ownerAdminData.ownerAdminGender} onChange={handleChange} required />
            </div>

            <div className="col-12 justify-content-center align-items-center d-flex">
              <button type="submit" className="btn btn-outline-primary w-50 my-3">Register Owner Admin</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterOwnerAdmin;
