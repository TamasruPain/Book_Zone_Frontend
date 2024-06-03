import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const All_Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://book-zone-backend.onrender.com/role/checkRole', {
          headers: { Authorization: token }
        });

        if (response.data.role !== 'User Admin' && response.data.role !== 'Owner Admin') {
          alert('Login to gain Access!');
          navigate('/');
        }
      } catch (error) {
        navigate('/');
      }
    };

    checkRole();
  }, [navigate]);

  useEffect(() => {
    axios.get("https://book-zone-backend.onrender.com/book/allbooks")
      .then(result => setBooks(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this book?");

    if (isConfirmed) {
      axios.delete(`https://book-zone-backend.onrender.com/book/deletebook/${id}`)
        .then(res => {
          console.log(res);
          setBooks(prevBooks => prevBooks.filter(book => book._id !== id));
        })
        .catch(err => console.log(err));
    }
  };

  const filteredBooks = books.filter(book =>
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
    <div className="main-container">
      <div className='justify-content-center align-items-center'id="scrollspyBookTable" data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" tabIndex="0" style={{ maxHeight: '640px', overflowY: 'scroll' }}>
        <div className='rounded p-2'>
          <button onClick={handleDashboard} className='btn btn-dark btn-sm'>
            <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff", }} /> Dash Board
          </button>
          <div className='my-2' align='center'>
            <h2>Manage Books</h2>
            <hr className='rounded' size="5" width="50%" color="red" />
          </div>
          <div align='center'>
            <h5>All Books</h5>
            <Link to='/all_books' className="btn btn-warning mx-2 my-1">All Books</Link>
            <Link to='/books_bca' className="btn btn-outline-secondary mx-2 my-1">BCA</Link>
            <Link to='/books_mca' className="btn btn-outline-secondary mx-2 y-1">MCA</Link>
            <Link to='/books_btech' className="btn btn-outline-secondary mx-2 my-1">B.Tech</Link>
            <Link to='/books_mtech' className="btn btn-outline-secondary mx-2 my-1">M.Tech</Link>
            <Link to='/books_bba' className="btn btn-outline-secondary mx-2 my-1">BBA</Link>
            <Link to='/books_mba' className="btn btn-outline-secondary mx-2 my-1">MBA</Link>
          </div>
          <div className='container'>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="text"
                  placeholder="Search books by name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control my-2"
                />
              </div>
              <div className="col-md-4 offset-md-5" align='right'>
                <Link to='/addbookscard' className='btn btn-outline-success float-right my-2'><b>Add books +</b></Link>
              </div>
            </div>

            <div className="row row-cols-1 row-cols-md-3 g-4 my-1">
              {filteredBooks.map((book) => (
                <div className="col" key={book._id}>
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
                        onClick={() => handleDelete(book._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default All_Books;
