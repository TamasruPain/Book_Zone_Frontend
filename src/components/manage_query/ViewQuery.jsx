import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

const ViewQuery = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkRole = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:7777/role/checkRole', {
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
    axios.get(`http://localhost:7777/query/queries/${id}`)
      .then(response => {
        setQuery(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this query?");

    // If user confirms, proceed with deletion
    if (isConfirmed) {
      axios.delete(`http://localhost:7777/query/deleteQuery/${id}`)
        .then(res => {
          console.log(res);
          navigate('/manage_query'); // Redirect after deletion
        })
        .catch(err => console.log(err));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!query) return <p>Query not found</p>;

  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-4 rounded' style={{ height: 'auto', width: '800px' }}>
        <div align='right'>
          <Link to='/manage_query' className='btn btn-outline-primary'><FontAwesomeIcon icon={faAnglesLeft} /></Link>
        </div>
        <div className='my-4'>
          <label>Subject: </label>
          <label><strong>{query.subject}</strong></label>
        </div>
        <table className="table table-hover table-bordered my-4">
          <thead className='table-active'>
            <tr>
              <th scope="col">Student Name</th>
              <th scope='col'>Email Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{query.name}</td>
              <td>{query.email}</td>
            </tr>
          </tbody>

          <thead className="table-active">
            <tr>
              <th scope='col' colSpan="4">Query:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="4">{query.text}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <button type='button' className='btn btn-outline-danger my-2 mx-2' onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ViewQuery;
