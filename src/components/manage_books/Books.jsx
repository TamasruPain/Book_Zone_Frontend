import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://book-zone-mern-app.onrender.com/role/checkRole', {
          headers: { Authorization: token }
        });

        // Check if the role is either "userAdmin" or "ownerAdmin"
        if (response.data.role !== 'Student' && response.data.role !== 'Owner Admin') {
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
    axios.get('https://book-zone-mern-app.onrender.com/book/allbooks')
      .then(result => setBooks(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDepartmentChange = (department) => {
    setDepartmentFilter(department);
  };

  const handleSemesterChange = (semester) => {
    setSemesterFilter(semester);
  };

  const clearFilters = () => {
    setDepartmentFilter('');
    setSemesterFilter('');
    setSearchTerm('');
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.bname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter ? book.department.toLowerCase() === departmentFilter.toLowerCase() : true;
    const matchesSemester = semesterFilter ? book.semester.toLowerCase() === semesterFilter.toLowerCase() : true;
    return matchesSearch && matchesDepartment && matchesSemester;
  });


  const handleDashboard = () => {
    const role = localStorage.getItem('role');
    if (role === 'ownerAdmin') {
      navigate('/owneradmindash');
    } else {
      navigate('/Student_dash');
    }
  };


  return (

    <div className='justify-content-center align-items-center'>
      <div className='rounded p-3'>
        <div>
          <button onClick={handleDashboard} className='btn btn-dark btn-sm'> <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff", }} /> Dash Board</button>
        </div>
        <div align='center'>
          <h2> Books Zone </h2>
          <hr className='rounded' size="5" width="50%" color="red" />
        </div>
        <div align='center'>
          <h5>All the books you need</h5>
        </div>

        <div className='container'>
          <div className="row">
            <div className="col-md-4">
              <input
                type="text"
                placeholder="Search books by name"
                value={searchTerm}
                onChange={handleSearch}
                className="form-control my-2"
              />
            </div>
            <div className="col-md-4 offset-md-4" align='right'>
              <div className="dropdown">
                <button className="btn btn-outline-dark dropdown-toggle my-1 mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {departmentFilter ? departmentFilter : 'Department'}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><button className="dropdown-item" onClick={() => handleDepartmentChange('BCA')}>BCA</button></li>
                  <li><button className="dropdown-item" onClick={() => handleDepartmentChange('MCA')}>MCA</button></li>
                  <li><button className="dropdown-item" onClick={() => handleDepartmentChange('B.Tech')}>B.Tech</button></li>
                  <li><button className="dropdown-item" onClick={() => handleDepartmentChange('M.Tech')}>M.Tech</button></li>
                  <li><button className="dropdown-item" onClick={() => handleDepartmentChange('BBA')}>BBA</button></li>
                  <li><button className="dropdown-item" onClick={() => handleDepartmentChange('MBA')}>MBA</button></li>
                </ul>
                <button className="btn btn-outline-dark dropdown-toggle my-2 mx-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {semesterFilter ? semesterFilter : 'Semester'}
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><button className="dropdown-item" onClick={() => handleSemesterChange('1st')}>1st Semester</button></li>
                  <li><button className="dropdown-item" onClick={() => handleSemesterChange('2nd')}>2nd Semester</button></li>
                  <li><button className="dropdown-item" onClick={() => handleSemesterChange('3rd')}>3rd Semester</button></li>
                  <li><button className="dropdown-item" onClick={() => handleSemesterChange('4th')}>4th Semester</button></li>
                  <li><button className="dropdown-item" onClick={() => handleSemesterChange('5th')}>5th Semester</button></li>
                  <li><button className="dropdown-item" onClick={() => handleSemesterChange('6th')}>6th Semester</button></li>
                  <li><button className="dropdown-item" onClick={() => handleSemesterChange('7th')}>7th Semester</button></li>
                  <li><button className="dropdown-item" onClick={() => handleSemesterChange('8th')}>8th Semester</button></li>
                </ul>
                <button className="btn btn-outline-warning my-2 mx-2" onClick={clearFilters}>Clear Filters</button>
              </div>
            </div>
          </div>
          <div id="scrollspyTable" className="row row-cols-1 row-cols-md-3 g-4 my-1" data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" tabIndex="0" style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            {filteredBooks.map((book) => (
              <div className='col' key={book._id}>
                <div className='card'>
                  <div className='card-body'>
                    <div className='d-flex justify-content-between'>
                      <h4 className='card-title'>{book.bname}</h4>
                      {book.blink !== undefined && (
                        <div className='text-muted'>{book.blink ? 'Available' : 'Unavailable'}</div>
                      )}
                    </div>
                    <label></label>
                    <p className='card-text'><span><b>Author: </b></span>{book.auther}</p>
                    <p><span><b>Published Year: </b></span>{book.publishYear}</p>
                    <p><span><b>Edition: </b></span>{book.edition}</p>
                    <Link to={`/viewbookstd/${book._id}`} className='btn btn-outline-dark my-2'>Get the Book</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;
