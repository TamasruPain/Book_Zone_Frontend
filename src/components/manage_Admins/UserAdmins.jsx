import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';


const UserAdmins = () => {

  const navigate = useNavigate();
  const [userAdmins, setUserAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const checkRole = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:7777/role/checkRole', {
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
    axios.get("http://localhost:7777/user/userAdmins")
      .then(result => setUserAdmins(result.data))
      .catch(err => console.log(err));
  }, []);


  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this student?");
    if (isConfirmed) {
      axios.delete(`http://localhost:7777/user/deleteUserAdmin/${id}`)
        .then(res => {
          console.log(res);
          setUserAdmins(userAdmins.filter(admin => admin._id !== id));
        })
        .catch(err => console.log(err));
    }
  };

  const filteredUserAdmins = userAdmins.filter(admin =>
    admin.userAdminName.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className='justify-content-center align-items-center'>
        <div className='rounded p-3'>
          
          <div>
            <button onClick={handleDashboard} className='btn btn-dark btn-sm'>
              <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff", }} /> Dash Board
            </button>
          </div>

          <div align='center'>
            <h2>User Admin Management</h2>
            <hr className='rounded my-3' size="5" width="50%" color="red" />
          </div>
          <div align='center' className='my-3'>
            <h5>All Registered Students</h5>
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
                <Link to='/adminUserregister' className='btn btn-outline-success float-right my-3'><b>Register a admin +</b></Link>
              </div>
            </div>

            <div className="row row-cols-1 row-cols-md-4 g-4">
              <table className="table table-hover table-bordered">
                <thead className='table-success'>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">User Name</th>
                    <th scope='col'>Email Address</th>
                    <th scope='col'>Gender </th>
                    <th scope='col'>Institute</th>
                    <th scope='col'>Actions</th>

                  </tr>
                </thead>
                <tbody>
                  {filteredUserAdmins.map((admin, index) => (
                    <tr key={admin._id}>
                      <td>{index + 1}</td>
                      <td>{admin.userAdminName}</td>
                      <td>{admin.userAdminEmail}</td>
                      <td>{admin.userAdminGender}</td>
                      <td>{admin.userAdminInstitute}</td>
                      <td>
                        <Link to={`/updateuseradmin/${admin._id}`} className='btn btn-outline-info mx-2 my-2'>Update</Link>
                        <button type='button' className='btn btn-outline-danger my-2 mx-2'
                          onClick={() => handleDelete(admin._id)}>Delete</button>
                      </td>
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

export default UserAdmins;
