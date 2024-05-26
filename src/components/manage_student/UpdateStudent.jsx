import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft} from '@fortawesome/free-solid-svg-icons';


const UpdateStudent = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [studentData, setStudentData] = useState({
    Std_Name: '',
    Std_Id: '',
    Std_DOB: '',
    Std_Email: '',
    Std_Department: '',
    Std_Semester: '',
    Std_AdmissionYear: '',
    Std_Institute: '', // Added Std_Institute field
  });

  useEffect(() => {
    axios.get("http://localhost:7777/student/getStudent/" + id)
      .then(result => {
        console.log(result)
        const data = result.data;
        setStudentData({
          ...studentData,
          Std_Name: data.Std_Name || '',
          Std_Id: data.Std_Id || '',
          Std_DOB: data.Std_DOB || '',
          Std_Gender: data.Std_Gender ||'',
          Std_Email: data.Std_Email || '',
          Std_Department: data.Std_Department || '',
          Std_Semester: data.Std_Semester || '',
          Std_AdmissionYear: data.Std_AdmissionYear || '',
          Std_Institute: data.Std_Institute || '', // Set Std_Institute from API
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:7777/student/updateStudent/${id}`, studentData)
      .then(result => {
        console.log(result)
        navigate(-1);
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className='bg-white p-4 rounded w-50'>
          <div align='right'>
            <Link to='/all_students' className='btn btn-outline-primary'><FontAwesomeIcon icon={faAnglesLeft} /></Link>

          </div>
          <h2 className='container d-flex justify-content-center align-items-center'>Update Student</h2>

          <form className="row g-3" onSubmit={handleUpdate}>

            <div className="col-6">
              <label className="form-label" htmlFor="typeName">Student Name</label>
              <input type="text" placeholder='Enter the Full Name' id="typeName" className="form-control"
                name="Std_Name" value={studentData.Std_Name} onChange={handleInputChange} />
            </div>

            <div className="col-md-6">
              <label htmlFor="inputNumber" className="form-label">Student Id</label>
              <input type="text" placeholder='Enter the 10 digit Id' className="form-control" id="inputNumber"
                name="Std_Id" value={studentData.Std_Id} onChange={handleInputChange} />
            </div>

            <div className="col-md-3">
              <label className="form-label" htmlFor="typeYear">Date of Birth</label>
              <input type="text" id="typeYear" placeholder='DDMMYYYY' className="form-control"
                name="Std_DOB" value={studentData.Std_DOB} onChange={handleInputChange} />
            </div>

            <div className="col-md-3">
              <label className="form-label" htmlFor="typeGender">Gender</label>
              <input type="text" id="typeGender" placeholder='your gender' className="form-control"
                name="Std_Gender" value={studentData.Std_Gender} onChange={handleInputChange} />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="typeInstitute">Institute</label>
              <input type="text" id="typeInstitute" placeholder='Enter your institute' className="form-control"
                name="Std_Institute" value={studentData.Std_Institute} onChange={handleInputChange} />
            </div>

            <div className="col-md-3">
              <label className="form-label" htmlFor="typeAdmissionYear">Admission Year</label>
              <input type="text" placeholder='Admission Date of the Student ' id="typeAdmissionYear" className="form-control"
                name="Std_AdmissionYear" value={studentData.Std_AdmissionYear} onChange={handleInputChange} />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="typeEmail">Email Address</label>
              <input type="email" placeholder='Email Address of the Student' id="typeEmail" className="form-control"
                name="Std_Email" value={studentData.Std_Email} onChange={handleInputChange} />
            </div>

            <div className="col-md-3">
              <label className="form-label" htmlFor="typeDeparment">Department</label>
              <input type="text" id="typeDepartment" placeholder='College Department' className="form-control"
                name="Std_Department" value={studentData.Std_Department} onChange={handleInputChange} />
            </div>

            <div className="col-md-3">
              <label className="form-label" htmlFor="typeSemester">Semester</label>
              <input type="text" placeholder='Current Semester Of the Student ' id="typeSemester" className="form-control"
                name="Std_Semester" value={studentData.Std_Semester} onChange={handleInputChange} />
            </div>




            <div className="col-12 justify-content-center align-items-center d-flex">
              <button type="submit" className="btn btn-outline-primary my-3 w-50">Update Student</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default UpdateStudent
