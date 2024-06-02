import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';


const Books_MCA = () => {

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


  const [mcaBooks, setMCABooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://book-zone-backend.onrender.com/book/mca_books")
      .then(result => setMCABooks(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this book?");

    // If user confirms, proceed with deletion
    if (isConfirmed) {
      axios.delete(`https://book-zone-backend.onrender.com/book/deletebook/${id}`)
        .then(res => {
          console.log(res);
          // Use navigate to go back to the previous page
          window.location.reload()
        })
        .catch(err => console.log(err));
    }
  };
  // Filter books based on search term
  const filteredBooks = mcaBooks.filter(book =>
    book.bname.toLowerCase().includes(searchTerm.toLowerCase())
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
            <button onClick={handleDashboard} className='btn btn-dark btn-sm'> <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff", }} /> Dash Board</button>
          </div>
          <div align='center'>
            <h2>Manage Books </h2>
            <hr className='rounded my-3' size="5" width="50%" color="red" />
          </div>
          <div align='center' className='my-3'>
            <h5>MCA Books</h5>
            <Link to='/all_books' className="btn btn-secondary mx-2">All Books</Link>
            <Link to='/books_bca' className="btn btn-outline-secondary mx-2">BCA</Link>
            <Link to='/books_mca' className="btn btn-warning mx-2">MCA</Link>
            <Link to='/books_btech' className="btn btn-outline-secondary mx-2">B.Tech</Link>
            <Link to='/books_mtech' className="btn btn-outline-secondary mx-2">M.Tech</Link>
            <Link to='/books_bba' className="btn btn-outline-secondary mx-2">BBA</Link>
            <Link to='/books_mba' className="btn btn-outline-secondary mx-2">MBA</Link>
          </div>
          <div className='container'>
            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Search books by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control my-3"
                />
              </div>
              <div className="col-md-4 offset-md-4" align='right'>
                <Link to='/addbookscard' className='btn btn-outline-success float-right my-3'><b>Add books +</b></Link>
              </div>
            </div>

            <div id="scrollspyBookTable" className="row row-cols-1 row-cols-md-3 g-4 my-1" data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" tabIndex="0" style={{ maxHeight: '380px', overflowY: 'scroll' }}>
              {
                filteredBooks.map((book) => {
                  return <div className="col" key={book._id}>
                    <div className="card">
                      <div className="card-body">
                        <div className='d-flex justify-content-between'>
                          <h4 className='card-title'>{book.bname}</h4>
                          {book.blink !== undefined && (
                            <div className='text-muted'>{book.blink ? 'Available' : 'Unavailable'}</div>
                          )}
                        </div>
                        <label className='text-muted mb-2'></label>
                        <p className="card-text"><span><b>Author: </b></span>{book.auther}</p>
                        <p><span><b>Published Year: </b></span>{book.publishYear}</p>
                        <p><span><b>Edition: </b></span>{book.edition}</p>
                        <p><b>Department: </b>{book.department} & <b>Sem: </b>{book.semester}</p>

                        <Link to={`/viewbook/${book._id}`} className='btn btn-outline-primary mx-2 my-2'>View</Link>
                        <Link to={`/updatebookscard/${book._id}`} className='btn btn-outline-info mx-2 my-2'>Update</Link>
                        <button type='button' className='btn btn-outline-danger mx-2 my-2'
                          onClick={(e) => handleDelete(book._id)}>Delete</button>
                      </div>
                    </div>
                  </div>

                })
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Books_MCA
