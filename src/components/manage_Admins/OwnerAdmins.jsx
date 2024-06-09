import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';


const OwnerAdmins = () => {

  const navigate = useNavigate();
  const [ownerAdmins, setOwnerAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


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
        navigate('/owneradminlogin');
      }
    };

    checkRole();
  }, []);

  useEffect(() => {
    axios.get("https://book-zone-backend.onrender.com/owner/ownerAdmins")
      .then(result => setOwnerAdmins(result.data))
      .catch(err => console.log(err));
  }, []);


  const filteredOwnerAdmins = ownerAdmins.filter(admin =>
    admin.ownerAdminName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDashboard = () => {
    const role = localStorage.getItem('role');
    if (role === 'ownerAdmin') {
      navigate('/owneradmindash');
    } else {
      navigate('/useradmindash');
    }
  };

  return (
    <div>
      <div className='justify-content-center align-items-center'id="scrollspyBookTable" data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" tabIndex="0" style={{ maxHeight: '640px', overflowY: 'scroll' }}>
        <div className='rounded p-3'>

          <div>
            <button onClick={handleDashboard} className='btn btn-dark btn-sm'>
              <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff", }} /> Dash Board
            </button>
          </div>

          <div align='center'>
            <h2>Owner Admins</h2>
            <hr className='rounded my-3' size="5" width="50%" color="red" />
          </div>
          <div align='center' className='my-3'>
            <h5>All Registered Admins</h5>
          </div>
          <div className='container'>
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Search by Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control my-3"
                />
              </div>
              <div className="col-md-4 offset-md-4" align='right'>
                <Link to='/adminOwnerregister' className='btn btn-outline-success float-right my-3'><b>Register an admin +</b></Link>
              </div>
            </div>

            <div className="row row-cols-1 row-cols-md-4 g-4">

              <table className="table table-hover table-bordered">
                <thead className='table-success'>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Admin Name</th>
                    <th scope='col'>Email Address</th>
                    <th scope='col'>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOwnerAdmins.map((admin, index) => (
                    <tr key={admin._id}>
                      <td>{index + 1}</td>
                      <td>{admin.ownerAdminName}</td>
                      <td>{admin.ownerAdminEmail}</td>
                      <td>{admin.ownerAdminGender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerAdmins;
