import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

const MakeQuery = () => {
  const [query, setQuery] = useState({ name: '', email: '', subject: '', text: '' });
  const navigate = useNavigate(); // Importing useNavigate

  useEffect(() => {
    const checkRole = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://book-zone-mern-app.onrender.com/role/checkRole', {
          headers: { Authorization: token }
        });

        // Check if the role is either "userAdmin" or "ownerAdmin"
        if (response.data.role !== "Student") {
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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting query:', query); // Log the query object
    try {
      const response = await axios.post('https://book-zone-mern-app.onrender.com/query/makeQuery', query);
      console.log('Response:', response); // Log the response
      alert('Query submitted successfully');
      navigate(-1); // Navigating back after submission
    } catch (error) {
      console.error('Error submitting query:', error.response?.data || error.message); // Log error details
      alert('Error submitting query');
    }
  };


  return (
    <div>
      <div className='d-flex justify-content-center align-items-center' style={{ height: '600px' }} >
        <div className='form-container card p-4' style={{ height: '580px', width: '400px' }}  >

          <div align='right'>
            <Link to='/student_dash' className='btn btn-outline-primary'><FontAwesomeIcon icon={faAnglesLeft} /></Link>

          </div>
          <h2 className='container d-flex justify-content-center align-items-center'>Make your Query</h2>

          <form className="row g-3 my-3" onSubmit={handleSubmit}>

            <div className="col-6">
              <label className="form-label" htmlFor="typeName"><b>Student Name</b></label>
              <input type="text" placeholder='Enter the Full Name' id="typeName" className="form-control"
                name="name" value={query.name} onChange={handleChange} /> {/* Changed name to "name" */}
            </div>

            <div className="col-md-6">
              <label htmlFor="inputEmail" className="form-label"><b>Email</b></label>
              <input type="email" placeholder='Enter your emali' className="form-control" id="inputEmail"
                name="email" value={query.email} onChange={handleChange} /> {/* Changed name to "email" */}
            </div>

            <div className="col-md-12">
              <label className="form-label" htmlFor="typeSubject"><b>Subject</b></label>
              <input type="text" id="typeSubject" placeholder='subject' className="form-control"
                name="subject" value={query.subject} onChange={handleChange} /> {/* Changed name to "subject" */}
            </div>

            <div className="col-md-12">
              <label className="form-label" htmlFor="typeText"><b>Queries</b></label>
              <textarea type="text" id="typeText" placeholder='Enter your Query' className="form-control"
                name="text" value={query.text} onChange={handleChange} />
            </div>

            <div className="col-md-12 justify-content-center align-items-center d-flex">
              <button type="submit" className="btn btn-outline-primary w-50 my-3">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MakeQuery;
