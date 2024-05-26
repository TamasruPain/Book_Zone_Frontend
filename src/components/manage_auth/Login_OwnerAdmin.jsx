import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Login_OwnerAdmin = () => {
  const [ownerAdminEmail, setOwnerAdminEmail] = useState('');
  const [ownerAdminPassword, setOwnerAdminPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:7777/owner/owneradminlogin', {
        ownerAdminEmail,
        ownerAdminPassword,
      });
      console.log('Login response:', response.data); // Log the response for debugging
      if (response.data.token) {
        // Login successful
        localStorage.setItem('token', response.data.token); // Store token in local storage
        localStorage.setItem('role', 'ownerAdmin'); // Store role in local storage
        message.success('Login successful!');
        navigate('/owneradmindash');
      } else {
        // Login failed
        message.error(response.data.message || 'Login failed! Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error); // Log any errors
      message.error('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:'600px'}} >
      <div className='form-container card p-4' style={{ height: '500px', width:'400px' }}  >
        <div className="" align={'right'}>
          <Link to="/" className='btn btn-outline-success'><FontAwesomeIcon icon={faArrowLeft} /> Back</Link>
        </div>

        <div className='text-center my-3'>
          <h2 className='my-2'>Sign In as Owner</h2>
          <p className='text-secondary'>Unlock your world!</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className='form-group'>
            <label htmlFor='ownerAdminEmail'>Email</label>
            <input
              type='email'
              id='ownerAdminEmail'
              className='form-control'
              placeholder='Enter your email'
              value={ownerAdminEmail}
              onChange={(e) => setOwnerAdminEmail(e.target.value)}
              required
            />
          </div>

          <div className='form-group my-4'>
            <label htmlFor='ownerAdminPassword'>Password</label>
            <input
              type='password'
              id='ownerAdminPassword'
              className='form-control'
              placeholder='Enter your password'
              value={ownerAdminPassword}
              onChange={(e) => setOwnerAdminPassword(e.target.value)}
              required
            />
          </div>

          <div className='text-center my-4'>
            <button type='submit' className='btn btn-outline-warning col-4' disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>

        {/* <div className='text-center'>
          <p>Don't have an account? <Link to='/owneradminregister'>Register!</Link></p>
        </div> */}
      </div>
      
    </div>
  );
};

export default Login_OwnerAdmin;
