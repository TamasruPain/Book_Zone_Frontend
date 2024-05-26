import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SignUp_OwnerAdmin = () => {
  const [ownerAdminName, setOwnerAdminName] = useState('');
  const [ownerAdminEmail, setOwnerAdminEmail] = useState('');
  const [ownerAdminGender, setOwnerAdminGender] = useState('');
  const [ownerAdminPassword, setOwnerAdminPassword] = useState('');

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://book-zone-mern-app.onrender.com/owner/owneradminsignup', {
        ownerAdminName,
        ownerAdminEmail,
        ownerAdminGender,
        ownerAdminPassword,
      });

      setLoading(false);
      if (response.data.message === 'User already exists') {
        setErrorMessage('User already exists. Please try logging in.');
        message.error('User already exists. Please try logging in.');
      } else {
        message.success('Registration successful!');
        navigate('/owneradminlogin');
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setErrorMessage('An error occurred. Please try again.');
      message.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '640px' }} >
      <div className='form-container card p-4' style={{ height: '620px', width: '400px' }}  >
        <div className="" align={'right'}>
          <Link to="/" className='btn btn-outline-success'><FontAwesomeIcon icon={faArrowLeft} /> Back</Link>
        </div>

        <h2 className='text-center mb-3'>Sign Up as Owner</h2>
        <p className='text-center text-secondary mb-4'>Create your account</p>

        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        <form className='row g-3' onSubmit={handleSubmit}>
          <div className='col-md-12'>
            <label className='form-label'>Full Name</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter your full name'
              value={ownerAdminName}
              onChange={(e) => setOwnerAdminName(e.target.value)}
              required
            />
          </div>

          <div className='col-md-12'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              className='form-control'
              placeholder='Enter your email'
              value={ownerAdminEmail}
              onChange={(e) => setOwnerAdminEmail(e.target.value)}
              required
            />
          </div>

          <div className='col-md-12'>
            <label className='form-label'>Gender</label>
            <input
              type='text'
              className='form-control'
              placeholder='Enter your Gender'
              value={ownerAdminGender}
              onChange={(e) => setOwnerAdminGender(e.target.value)}
              required
            />
          </div>

          <div className='col-md-12'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              className='form-control'
              placeholder='Enter your password'
              value={ownerAdminPassword}
              onChange={(e) => setOwnerAdminPassword(e.target.value)}
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
          <p>Already have an account? <Link to='/owneradminlogin'>Login!</Link></p>
        </div>
      </div>
    </div>

  );
};

export default SignUp_OwnerAdmin;
