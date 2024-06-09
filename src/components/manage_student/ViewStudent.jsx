import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

const ViewStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://book-zone-backend.onrender.com/student/student/${id}`)
      .then(response => {
        setStudent(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    // Show confirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to delete this student?");

    // If user confirms, proceed with deletion
    if (isConfirmed) {
      axios.delete(`https://book-zone-backend.onrender.com/student/deleteStudent/${id}`)
        .then(res => {
          console.log(res);
          // Redirect to all students page or any other desired page
        })
        .catch(err => console.log(err));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!student) return <p>Student not found</p>;

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '600px' }} >
      <div className='form-container card p-2' style={{ height: '595px', width: '450px' }} >
        <div className='row p-3'>
          <div className='col-6 my-4' align='left'>
            <h4>{student.Std_Name}</h4>
          </div>
          <div className='col-6' align='right'>
            <Link to='/all_students' className='btn btn-outline-primary'><FontAwesomeIcon icon={faAnglesLeft} /></Link>
          </div>
          <div className="row g-1 my-1 overflow-x-auto">
            <table className="table table-hover table-bordered my-2">
              <thead>
                <tr>
                  <th scope="col">Student Name</th>
                  <th scope="col">Student ID</th>
                  <th scope='col'>Date Of Birth</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{student.Std_Name}</td>
                  <td>{student.Std_Id}</td>
                  <td>{student.Std_DOB}</td>
                </tr>
              </tbody>
            </table>
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">Department</th>
                  <th scope='col'>Admission Year</th>
                  <th scope='col'>Semester</th>
                </tr>
              </thead>
              <tbody>
                <tr>

                  <td>{student.Std_Department}</td>
                  <td>{student.Std_AdmissionYear}</td>
                  <td>{student.Std_Semester}</td>
                </tr>
              </tbody>
            </table>
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                <th scope='col'>Email Address</th>
                  <th scope='col'>Gender</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{student.Std_Email}</td>
                  <td>{student.Std_Gender}</td>
                </tr>
              </tbody>
            </table>
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope='col'>Institute</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{student.Std_Institute}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <Link to={`/update_student/${student._id}`} className='btn btn-outline-info my-2 mx-2'>Update</Link>
            <button type='button' className='btn btn-outline-danger my-2 mx-2' onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
