import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [studentData, setStudentData] = useState({
    Std_Name: '',
    Std_Id: '',
    Std_DOB: '',
    Std_Email: '',
    Std_Department: '',
    Std_Semester: '',
    Std_AdmissionYear: '',
    Std_Institute: '',
    Std_Gender: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://book-zone-mern-app.onrender.com/student/addStudents", studentData);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center' style={{ height: '600px' }} >
        <div className='form-container card p-4' style={{ height: '600px', width: '600px' }}  >
          <div align='right'>
            <Link to='/all_students' className='btn btn-success'>Go Back</Link>
          </div>
          <h2 className='container d-flex justify-content-center align-items-center'>Student Details</h2>

          <form className="row g-3 my-3" onSubmit={handleSubmit}>

            <div className="col-6">
              <label className="form-label" htmlFor="typeName"><b>Student Name</b></label>
              <input type="text" placeholder='Enter the Full Name' id="typeName" className="form-control"
                name="Std_Name" value={studentData.Std_Name} onChange={handleChange} required />
            </div>

            <div className="col-md-6">
              <label htmlFor="inputNumber" className="form-label"><b>Student Id</b></label>
              <input type="text" placeholder='Enter the 10 digit Id' className="form-control" id="inputNumber"
                name="Std_Id" value={studentData.Std_Id} onChange={handleChange} required />
            </div>

            <div className="col-md-4">
              <label className="form-label" htmlFor="typeYear"><b>Date of Birth</b></label>
              <input type="text" id="typeYear" placeholder='DDMMYYYY' className="form-control"
                name="Std_DOB" value={studentData.Std_DOB} onChange={handleChange} required />
            </div>

            <div className="col-md-8">
              <label className="form-label" htmlFor="typeEmail"><b>Email Address</b></label>
              <input type="Email" placeholder='Email Address of the Student' id="typeEmail" className="form-control"
                name="Std_Email" value={studentData.Std_Email} onChange={handleChange} required />
            </div>

            <div className="col-md-4">
              <label className="form-label" htmlFor="typeGender"><b>Gender</b></label>
              <input type="text" id="typeGender" placeholder='Student Gender' className="form-control"
                name="Std_Gender" value={studentData.Std_Gender} onChange={handleChange} required />
            </div>

            <div className="col-md-8">
              <label className="form-label" htmlFor="typeInstitute"><b>Institute</b></label>
              <input type="text" id="typeInstitute" placeholder='Enter your institute' className="form-control"
                name="Std_Institute" value={studentData.Std_Institute} onChange={handleChange} required />
            </div>

            <div className="col-md-4">
              <label className="form-label" htmlFor="typeSemester"><b>Admission Year</b></label>
              <input type="text" placeholder='Admission Date of the Student ' id="typeSemester" className="form-control"
                name="Std_AdmissionYear" value={studentData.Std_AdmissionYear} onChange={handleChange} required />
            </div>



            <div className="col-md-4">
              <label className="form-label" htmlFor="typeDepartment"><b>Department</b></label>
              <input type="text" id="typeDepartment" placeholder='College Department' className="form-control"
                name="Std_Department" value={studentData.Std_Department} onChange={handleChange} required />
            </div>

            <div className="col-md-4">
              <label className="form-label" htmlFor="typeSemester"><b>Semester</b></label>
              <input type="text" placeholder='Current Semester Of the Student ' id="typeSemester" className="form-control"
                name="Std_Semester" value={studentData.Std_Semester} onChange={handleChange} required />
            </div>

            <div className=" col-md-12 justify-content-center align-items-center d-flex">
              <button type="submit" className="btn btn-outline-primary w-50 my-3">Register the Student </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddStudent;
