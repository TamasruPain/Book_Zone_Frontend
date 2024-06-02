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
        const response = await axios.get('https://book-zone-backend.onrender.com/role/checkRole', {
          headers: { Authorization: token }
        });

        // Check if the role is either "userAdmin" or "ownerAdmin"
        if (response.data.role !== 'Student' && response.data.role !== 'Owner Admin') {
          // Redirect to unauthorized page or handle accordingly
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
    axios.get(`https://book-zone-backend.onrender.com/book/book/${id}`)
      .then(response => {
        setBook(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const openLink = () => {
    if (book && book.blink) {
      window.open(book.blink, '_blank');
    }
  };

  const copyLink = () => {
    if (book && book.blink) {
      navigator.clipboard.writeText(book.blink);
      alert('Link copied to clipboard!');
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
            <Link to='/books' className='btn btn-outline-dark my-3'><FontAwesomeIcon icon={faAnglesLeft} /></Link>
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

        <div className="row row-cols-1 row-cols-md-4 g-1 my-1 overflow-x-auto">
          <table className="table my-3">
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

        </div>
        <div className='my-4'>
          <Link className='btn btn-outline-dark' onClick={openLink}>
            Open Link
          </Link>
          <label className='mx-2'><b>Or</b></label>
          <Link className='btn btn-outline-dark' onClick={copyLink}>
            Copy Link
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
