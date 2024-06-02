import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';



const Manage_Query = () => {

  const [queries, setQueries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://book-zone-backend.onrender.com/role/checkRole', {
          headers: { Authorization: token }
        });

        // Check if the role is either "userAdmin" or "ownerAdmin"
        if (response.data.role !== 'User Admin' && response.data.role !== 'Owner Admin') {
          alert('Login to gain Access!')
          navigate('/');
        }
      } catch (error) {
        // Handle error or redirect to login page
        navigate('/');
      }
    };

    checkRole();
  }, []);


  useEffect(() => {
    axios.get("https://book-zone-backend.onrender.com/query/queries")
      .then(result => setQueries(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this query?");

    // If user confirms, proceed with deletion
    if (isConfirmed) {
      axios.delete(`https://book-zone-backend.onrender.com/query/deleteQuery/${id}`)
        .then(res => {
          console.log(res);
          // Refresh the queries after deletion
          setQueries(queries.filter(queries => queries._id !== id));
        })
        .catch(err => console.log(err));
    }
  };

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
            <button onClick={handleDashboard} className='btn btn-dark btn-sm'> <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff", }} /> Dash Board</button>
          </div>
          <div align='center'>
            <h2>Manage Queries</h2>
            <hr className='rounded my-3' size="5" width="50%" color="red" />
          </div>
          <div align='center' className='my-3'>
            <h5>Queries</h5>
          </div>
          <div className='container'>

            <div className="row row-cols-1 row-cols-md-4 g-4">
              <table className="table table-hover table-bordered">
                <thead className='table-success'>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Student Name</th>
                    <th scope='col'>Email Address</th>
                    <th scope='col'>Subject</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    queries.map((query, index) => (
                      <tr key={query._id}>
                        <td>{index + 1}</td>
                        <td>{query.name}</td>
                        <td>{query.email}</td>
                        <td>{query.subject}</td>
                        <td>
                          <Link to={`/viewQuery/${query._id}`} className='btn btn-outline-primary mx-2 my-2'>View</Link>
                          <button type='button' className='btn btn-outline-danger my-2 mx-2'
                            onClick={() => handleDelete(query._id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Manage_Query;
