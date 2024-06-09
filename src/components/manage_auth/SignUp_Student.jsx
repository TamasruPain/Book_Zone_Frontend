import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';



const SignUp_Student = () => {
  const [Std_Name, setStd_Name] = useState('');
  const [Std_Id, setStd_Id] = useState('');
  const [Std_DOB, setStd_DOB] = useState('');
  const [Std_Email, setStd_Email] = useState('');
  const [Std_Gender, setStd_Gender] = useState('');
  const [Std_Department, setStd_Department] = useState('');
  const [Std_Semester, setStd_Semester] = useState('');
  const [Std_AdmissionYear, setStd_AdmissionYear] = useState('');
  const [Std_Institute, setStd_Institute] = useState('');

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post('https://book-zone-backend.onrender.com/student/studentsignup/', {
        Std_Name,
        Std_Id,
        Std_DOB,
        Std_Email,
        Std_Department,
        Std_Semester,
        Std_AdmissionYear,
        Std_Institute,
        Std_Gender,
      });

      setLoading(false);
      if (response.data.message === 'User already exists') {
        setErrorMessage('User already exists. Please try logging in.');
        message.error('User already exists. Please try logging in.');
      } else {
        message.success('Registration successful!');
        navigate('/student_login');
      }
    } catch (err) {
      console.error('Error:', err.response || err.message || err);
      setLoading(false);
      setErrorMessage('An error occurred. Please try again.');
      message.error('An error occurred. Please try again.');
    }
  };

  const renderAdmissionYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
    return years.map(year => <option key={year} value={year}>{year}</option>);
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '640px' }}>
      <div className='form-container card p-3 d-flex' style={{ height: '610px', width: '650px' }}>
        <div className="" align={'right'}>
          <Link to="/" className='btn btn-outline-success'><FontAwesomeIcon icon={faArrowLeft} /> Back</Link>
        </div>
        <h2 className='text-center mb-3'>Sign Up as Student</h2>
        <p className='text-center text-secondary mb-4'>Create your account</p>

        <form className='row g-3' onSubmit={handleSubmit}>
          <div className='col-md-6'>
            <label className='form-label'>Full Name</label>
            <input
              type='text'
              className='form-control'
              value={Std_Name}
              onChange={(e) => setStd_Name(e.target.value)}
              required
            />
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Email Id</label>
            <input
              type='email'
              className='form-control'
              value={Std_Email}
              onChange={(e) => setStd_Email(e.target.value)}
              required
            />
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Student ID</label>
            <input
              type='text'
              className='form-control'
              value={Std_Id}
              onChange={(e) => setStd_Id(e.target.value)}
              required
            />
          </div>
          <div className='col-md-6'>
            <label className='form-label'>Date of Birth</label>
            <input
              type='date'
              className='form-control'
              value={Std_DOB}
              onChange={(e) => setStd_DOB(e.target.value)}
              required
            />
          </div>
          <div className='col-md-4'>
            <label className='form-label'>Gender</label>
            <select
              className='form-control'
              value={Std_Gender}
              onChange={(e) => setStd_Gender(e.target.value)}
              required
            >
              <option value=''>Select Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
          </div>
          <div className='col-md-7'>
            <label className='form-label'>Institution</label>
            <input
              type='text'
              className='form-control'
              value={Std_Institute}
              onChange={(e) => setStd_Institute(e.target.value)}
              required
            />
          </div>
          <div className='col-md-4'>
            <label className='form-label'>Year of Admission</label>
            <select
              className='form-control'
              value={Std_AdmissionYear}
              onChange={(e) => setStd_AdmissionYear(e.target.value)}
              required
            >
              <option value=''>Select Year</option>
              {renderAdmissionYearOptions()}
            </select>
          </div>
          <div className='col-md-4'>
            <label className='form-label'>Department</label>
            <input
              type='text'
              className='form-control'
              value={Std_Department}
              onChange={(e) => setStd_Department(e.target.value)}
              required
            />
          </div>
          <div className='col-md-4'>
            <label className='form-label'>Semester</label>
            <input
              type='text'
              className='form-control'
              value={Std_Semester}
              onChange={(e) => setStd_Semester(e.target.value)}
              required
            />
          </div>
          <div className='col-12 my-4 d-flex justify-content-center'>
            <button type='submit' className="btn btn-outline-primary w-50" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
        <div className='text-center'>
          <p>Already have an account? <Link to='/student_login'>Login!</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp_Student;