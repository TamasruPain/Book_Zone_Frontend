import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

const AddBooks_Cards = () => {

  const [bname, setBname] = useState()
  const [auther, setAuther] = useState()
  const [publishYear, setPublishYear] = useState()
  const [edition, setEdition] = useState()
  const [department, setDepartment] = useState()
  const [semester, setSemester] = useState()
  const [blink, setBlink] = useState()

  const navigate = useNavigate()

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



  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:7777/book/addbookscard", { bname, auther, publishYear, edition, department, semester, blink })
      .then(result => {
        console.log(result)
        navigate('/all_books')
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className=' d-flex justify-content-center align-items-center bg-secondary vh-100' >
        <div className='bg-white p-4 rounded w-50'>

          <div align='right'>
            <Link to='/all_books' className='btn btn-outline-primary'><FontAwesomeIcon icon={faAnglesLeft} /></Link>

          </div>
          <h2 className='container d-flex justify-content-center align-items-center'>Add Books</h2>

          <form className="row g-4 p-3 my-2" onSubmit={Submit}>

            <div className="col-6">
              <label className="form-label" htmlFor="typeText">Book Name</label>
              <input type="text" placeholder='' id="typeText" className="form-control"
                onChange={(e) => setBname(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label htmlFor="inputAuther" className="form-label">Auther</label>
              <input type="text" placeholder='' className="form-control" id="inputAuther"
                onChange={(e) => setAuther(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="typeYear">Publish Year:</label>
              <input type="text" id="typeYear" placeholder='' className="form-control"
                onChange={(e) => setPublishYear(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="typeEdition">Edition:</label>
              <input type="text" placeholder='' id="typeEdition" className="form-control"
                onChange={(e) => setEdition(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="typeDeparment">Department:</label>
              <input type="text" id="typeDepartment" placeholder='' className="form-control"
                onChange={(e) => setDepartment(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="typeSemester">Semester:</label>
              <input type="text" placeholder='' id="typeSemester" className="form-control"
                onChange={(e) => setSemester(e.target.value)} />
            </div>

            <div className="col-md-12">
              <label className="form-label" htmlFor="typeSemester">Book Link:</label>
              <input type="text" placeholder='' id="typeSemester" className="form-control"
                onChange={(e) => setBlink(e.target.value)} />
            </div>

            <div className="col-12 justify-content-center align-items-center d-flex">
              <button type="submit" className="btn btn-outline-primary w-50 my-2">Create a Book </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddBooks_Cards
