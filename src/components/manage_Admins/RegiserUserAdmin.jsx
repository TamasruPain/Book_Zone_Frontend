import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register_UserAdmin = () => {
  const [useradminData, setUseradminData] = useState({
    userAdminName: '',
    userAdminEmail: '',
    userAdminPassword: '',
    userAdminInstitute: '',
    userAdminGender: '',
  });

  const navigate = useNavigate();


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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUseradminData({ ...useradminData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://book-zone-backend.onrender.com/user/adduseradmin", useradminData);
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center' style={{ height: '600px' }} >
        <div className='form-container card p-4' style={{ height: '540px', width: '400px' }}  >
          <div align='right'>
            <Link to='/useradmins' className='btn btn-success'>Go Back</Link>
          </div>
          <h2 className='container d-flex justify-content-center align-items-center my-3'>User Admin Details</h2>

          <form className="row g-3 my-2" onSubmit={handleSubmit}>
            <div className="col-6">
              <label className="form-label" htmlFor="userAdminName"><b>User Admin Name</b></label>
              <input className='form-control' type="text" id="userAdminName" name="userAdminName" value={useradminData.userAdminName} onChange={handleChange} required />
            </div>

            <div className="col-6">
              <label className="form-label" htmlFor="userAdminEmail"><b>Email Address</b></label>
              <input className='form-control' type="email" id="userAdminEmail" name="userAdminEmail" value={useradminData.userAdminEmail} onChange={handleChange} required />
            </div>

            <div className="col-6">
              <label className="form-label" htmlFor="userAdminPassword"><b>Gender</b></label>
              <input className='form-control' type="text" id="userAdminGender" name="userAdminGender" value={useradminData.userAdminGender} onChange={handleChange} required />
            </div>

            <div className="col-6">
              <label className="form-label" htmlFor="userAdminInstitute"><b>Institute</b></label>
              <input className='form-control' type="text" id="userAdminInstitute" name="userAdminInstitute" value={useradminData.userAdminInstitute} onChange={handleChange} required />
            </div>

            <div className="col-6">
              <label className="form-label" htmlFor="ownerAdminPassword">Password</label>
              <input className='form-control' type="password" id="ownerAdminPassword" name="userAdminPassword" value={useradminData.userAdminPassword} onChange={handleChange} required />
            </div>

            <div className="col-12 justify-content-center align-items-center d-flex">
              <button type="submit" className="btn btn-outline-primary w-50 my-4">Register User Admin</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register_UserAdmin;
