import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';


const UpdateBooks_Card = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [bname, setBname] = useState('')
  const [auther, setAuther] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [edition, setEdition] = useState('')
  const [department, setDepartment] = useState('')
  const [semester, setSemester] = useState('')
  const [blink, setBlink] = useState('')

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
    axios.get("https://book-zone-backend.onrender.com/book/getbook/" + id)
      .then(result => {
        console.log(result)
        const data = result.data;
        setBname(data.bname || '');
        setAuther(data.auther || '');
        setPublishYear(data.publishYear || '');
        setEdition(data.edition || '');
        setDepartment(data.department || '');
        setSemester(data.semester || '');
        setBlink(data.blink || '');
      })
      .catch(err => console.log(err));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();
    axios.put("https://book-zone-backend.onrender.com/book/updatebookscard/" + id, { bname, auther, publishYear, edition, department, semester, blink })
      .then(result => {
        console.log(result)
        navigate(-1);
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center' style={{ height: '600px' }} >
        <div className='form-container card p-2' style={{ height: '600px', width: '600px' }}  >
          <div align='right'>
            <Link to='/all_books' className='btn btn-outline-primary'><FontAwesomeIcon icon={faAnglesLeft} /></Link>
          </div>
          <h2 className='container d-flex justify-content-center align-items-center'>Update Books</h2>

          <form className="row g-4 p-2 my-2" onSubmit={Update}>

            <div className="col-6">
              <label className="form-label" htmlFor="typeText">Book Name</label>
              <input type="text" placeholder='' id="typeText" className="form-control"
                value={bname} onChange={(e) => setBname(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label htmlFor="inputAuthor" className="form-label">Author</label>
              <input type="text" placeholder='' className="form-control" id="inputAuthor"
                value={auther} onChange={(e) => setAuther(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="typeYear">Published Year:</label>
              <input type="text" id="typeYear" placeholder='' className="form-control"
                value={publishYear} onChange={(e) => setPublishYear(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="typeEdition">Edition:</label>
              <input type="text" placeholder='' id="typeEdition" className="form-control"
                value={edition} onChange={(e) => setEdition(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="typeDepartment">Department:</label>
              <input type="text" placeholder='' id="typeDepartment" className="form-control"
                value={department} onChange={(e) => setDepartment(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="typeSemester">Semester:</label>
              <input type="text" placeholder='' id="typeSemester" className="form-control"
                value={semester} onChange={(e) => setSemester(e.target.value)} />
            </div>
            <div className="col-md-12">
              <label className="form-label" htmlFor="typeLink">Book Link:</label>
              <input type="text" placeholder='' id="typeLink" className="form-control"
                value={blink} onChange={(e) => setBlink(e.target.value)} />
            </div>

            <div className="col-12 justify-content-center align-items-center d-flex">
              <button type="submit" className="btn btn-outline-primary my-3 w-50"> Make Update </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default UpdateBooks_Card
