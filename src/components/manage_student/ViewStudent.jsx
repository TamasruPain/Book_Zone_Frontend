import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft} from '@fortawesome/free-solid-svg-icons';

const ViewStudent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:7777/student/student/${id}`)
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
      axios.delete(`http://localhost:7777/student/deleteStudent/${id}`)
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
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-4 rounded' style={{ height: 'auto', width: 'auto' }}>
        <div align='right'>
          <Link to='/all_students' className='btn btn-outline-primary'><FontAwesomeIcon icon={faAnglesLeft} /></Link>

        </div>
        <table className="table table-hover table-bordered my-4">
          <thead>
            <tr>
              <th scope="col">Student Name</th>
              <th scope="col">Student ID</th>
              <th scope='col'>Date Of Birth</th>
              <th scope='col'>Gender</th>
              <th scope="col">Department</th>
              <th scope='col'>Semester</th>
              <th scope='col'>Email Address</th>
              <th scope='col'>Admission Year</th>
              <th scope='col'>Institute</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{student.Std_Name}</td>
              <td>{student.Std_Id}</td>
              <td>{student.Std_DOB}</td>
              <td>{student.Std_Gender}</td>
              <td>{student.Std_email}</td>
              <td>{student.Std_Department}</td>
              <td>{student.Std_Semester}</td>
              <td>{student.Std_AdmissionYear}</td>
              <td>{student.Std_Institute}</td>
            </tr>
          </tbody>
        </table>
        <div>
          <Link to={`/update_student/${student._id}`} className='btn btn-outline-info my-2 mx-2'>Update</Link>
          <button type='button' className='btn btn-outline-danger my-2 mx-2' onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
