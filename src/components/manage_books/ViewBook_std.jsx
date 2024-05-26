import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft} from '@fortawesome/free-solid-svg-icons';

const ViewBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkRole = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:7777/role/checkRole', {
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
    axios.get(`http://localhost:7777/book/book/${id}`)
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
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-4 rounded' style={{ height: 'auto', width: 'auto' }}>
        <div align='right'>
          <Link to='/books' className='btn btn-outline-dark'><FontAwesomeIcon icon={faAnglesLeft} /></Link>

        </div>
        <table className="table table-bordered border-warning my-3">
          <thead className='table-success'>
            <tr>
              <th scope="col">Book Name</th>
              <th scope="col">Book Auther</th>
              <th scope='col'>Book Publish Year </th>
              <th scope="col">Book Edition</th>
              <th scope='col'>Department</th>
              <th scope='col'>Semester</th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{book.bname}</td>
              <td>{book.auther}</td>
              <td>{book.publishYear}</td>
              <td>{book.edition}</td>
              <td>{book.department}</td>
              <td>{book.semester}</td>
            </tr>
          </tbody>
        </table>

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

        <div className='my-2'>
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
