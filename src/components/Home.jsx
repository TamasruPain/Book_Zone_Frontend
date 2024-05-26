import React from 'react';
import signupImage from '../images/signup.jpg';
import loginImage from '../images/login.jpg';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faUserTie } from '@fortawesome/free-solid-svg-icons';

const Home = () => {

  return (

    <div>
      <div align='right'>

        <div style={{ marginRight: '10px' }}>
          <button type="button" className="btn btn-outline-dark my-3 mx-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <FontAwesomeIcon icon={faArrowRightToBracket} style={{ color: "#FFD43B", }} /> Go Admin
          </button>

          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasRightLabel">Hi Admin</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className='mx-5 my-5' align='left'>
              <label>Chose Your Login Type</label>
            </div>
            <div className="offcanvas-body">

              <div className="" align='center'>
                <div className='row row-cols-1 row-cols-md-1 g-5 p-4'>
                  <div className="col">
                    <Link to="/owneradminLogin">
                      <div className="card">
                        <div className="card-body">
                          <FontAwesomeIcon icon={faUserTie} style={{ color: "#004cff", fontSize: '48px' }} />
                          <label className="card-title mx-4 my-3">Owner Login</label>
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="col">
                    <Link to="/useradminlogin">
                      <div className="card">
                        <div className="card-body">
                          <FontAwesomeIcon icon={faUserTie} style={{ color: "#B197FC", fontSize: '48px' }} />
                          <label className="card-title mx-4 my-3">User Login</label>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
      <div className='d-flex justify-content-center'>
        <div className='bg-white p-5 rounded' style={{height:'400px',width:'800px'}}>
          <div align='center'>
            <h2>Welcome to the Book Zone</h2>
            <p>Find the Books you needed</p>
            <hr className='rounded my-3' size="5" width="98%" color="red" />
            <div className='bordered '>
              <div className='my-4'>
                <label>Students Registration And Login</label>
              </div>
              <div className="row row-cols-1 row-cols-md-3 justify-content-center">

                <div className="col-sm-5 my-2 mx-4">
                  <Link to="/student_register" style={{ textDecoration: 'none'}}>
                    <div className="card" style={{ height:'240px', width:'210px' }} >
                      <div className="card-body">
                        <img src={signupImage} className="card-img-top" alt="" />
                        <h6>Click here to Register</h6>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-sm-5 my-2 mx-4">
                  <Link to="/student_login" style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ height:'240px', width:'210px' }} >
                      <div className="card-body">
                        <img src={loginImage} className="card-img-top" alt="" />
                        <h6>Click here to Login</h6>
                      </div>
                    </div>
                  </Link>
                </div>

              </div>
            </div>
            <hr className='rounded my-5' size="5" width="98%" color="red" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
