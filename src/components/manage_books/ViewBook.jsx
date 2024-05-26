import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';


const ViewBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkRole = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://book-zone-mern-app.onrender.com/role/checkRole', {
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
    axios.get(`https://book-zone-mern-app.onrender.com/book/book/${id}`)
      .then(response => {
        setBook(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this book?");

    // If user confirms, proceed with deletion
    if (isConfirmed) {
      axios.delete(`https://book-zone-mern-app.onrender.com/book/deletebook/${id}`)
        .then(res => {
          console.log(res);
          // Reload the page to reflect the deletion
          window.location.reload();
        })
        .catch(err => console.log(err));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '600px' }} >
      <div className='form-container card p-2' style={{ height: '560px', width: '400px' }} >
        <div className='row p-3'>
          <div className='col-6' align='left'>
            <h4>{book.bname}</h4>
          </div>
          <div className='col-6' align='right'>
            <Link to='/all_books' className='btn btn-outline-dark my-3'><FontAwesomeIcon icon={faAnglesLeft} /></Link>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-4 g-1 my-1 overflow-x-auto">
          <table className="table table-bordered border-warning">
            <thead className='table-success'>
              <tr>
                <th scope="col">Book Name</th>
                <th scope="col"> Author</th>
                <th scope='col'>Published Year </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{book.bname}</td>
                <td>{book.auther}</td>
                <td>{book.publishYear}</td>
              </tr>
            </tbody>
          </table>

          <table className="table table-bordered border-warning">
            <thead className='table-success'>
              <tr>

                <th scope="col">Edition</th>
                <th scope='col'>Department</th>
                <th scope='col'>Semester</th>

              </tr>
            </thead>
            <tbody>
              <tr>

                <td>{book.edition}</td>
                <td>{book.department}</td>
                <td>{book.semester}</td>
              </tr>
            </tbody>
          </table>

        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope='col'>Book Link:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {book.blink}
              </td>
            </tr>
          </tbody>
        </table>

        <div className='my-4'>
          <Link to={`/updatebookscard/${book._id}`} className='btn btn-outline-info'>Update</Link>
          <button type='button' className='btn btn-outline-danger mx-2'
            onClick={(e) => handleDelete(book._id)}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
