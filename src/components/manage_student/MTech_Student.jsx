import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const All_Students = () => {


  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const navigate = useNavigate()

  useEffect(() => {
    axios.get("https://book-zone-mern-app.onrender.com/student/mtech_students")
      .then(result => setStudents(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this book?");

    // If user confirms, proceed with deletion
    if (isConfirmed) {
      axios.delete(`https://book-zone-mern-app.onrender.com/student/deleteStudent/${id}`)
        .then(res => {
          console.log(res);
          // Use navigate to go back to the previous page
          window.location.reload()
        })
        .catch(err => console.log(err));
    }
  };
  // Filter books based on search term
  const filteredStudents = students.filter(student =>
    student.Std_Name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <button onClick={handleDashboard} className='btn btn-dark btn-sm'>
              <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff", }} /> Dash Board
            </button>
          </div>

          <div align='center'>
            <h2>Student Managment</h2>
            <hr className='rounded my-3' size="5" width="50%" color="red" />
          </div>
          <div align='center'>
            <h5>All Registered M.Tech Students</h5>

            <Link to='/all_students' className="btn btn-secondary my-2 mx-2">All Students</Link>
            <Link to='/bca_students' className="btn btn-outline-secondary mx-2">BCA </Link>
            <Link to='/mca_students' className="btn btn-outline-secondary mx-2">MCA</Link>
            <Link to='/btech_students' className="btn btn-outline-secondary mx-2">B.Tech</Link>
            <Link to='/mtech_students' className="btn btn-warning mx-2">M.Tech</Link>
            <Link to='/bba_students' className="btn btn-outline-secondary mx-2">BBA</Link>
            <Link to='/mba_students' className="btn btn-outline-secondary mx-2">MBA</Link>
          </div>

          <div className='container'>

            <div className="row">
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Search by ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-control my-3"
                />
              </div>
              <div className="col-md-4 offset-md-4" align='right'>
                <Link to='/add_student' className='btn btn-outline-success float-right my-3'><b>Register a student +</b></Link>
              </div>
            </div>

            <div id="scrollspyTable" className="row row-cols-1 row-cols-md-4 g-4 my-1" data-bs-spy="scroll" data-bs-target="#list-example" data-bs-offset="0" tabIndex="0" style={{ maxHeight: '380px', overflowY: 'scroll' }}>
              <table className="table table-hover table-bordered">
                <thead className='table-success'>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Student Name</th>
                    <th scope="col">Student ID</th>
                    <th scope='col'>Date Of Birth</th>
                    <th scope="col">Department</th>
                    <th scope='col'>Semester</th>
                    <th scope='col'>Email Address</th>
                    <th scope='col'>Admission Year</th>
                    <th scope='col'>Institute</th>
                    <th scope='col'>Actions</th>

                  </tr>
                </thead>
                <tbody>
                  {
                    filteredStudents.map((student, index) => {
                      return <tr key={student._id}>
                        <td>{index + 1}</td>
                        <td>{student.Std_Name}</td>
                        <td>{student.Std_Id}</td>
                        <td>{student.Std_DOB}</td>
                        <td>{student.Std_Department}</td>
                        <td>{student.Std_Semester}</td>
                        <td>{student.Std_Email}</td>
                        <td>{student.Std_AdmissionYear}</td>
                        <td>{student.Std_Institute}</td>
                        <td>
                          <Link to={`/viewstudent/${student._id}`} className='btn btn-outline-primary mx-2 my-2'>View</Link>
                          <Link to={`/update_student/${student._id}`} className='btn btn-outline-info mx-2 my-2'>Update</Link>
                          <button type='button' className='btn btn-outline-danger my-2 mx-2'
                            onClick={(e) => handleDelete(student._id)}>Delete</button>
                        </td>
                      </tr>

                    })
                  }
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default All_Students
