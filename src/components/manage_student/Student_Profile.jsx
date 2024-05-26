import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faTrashCan, faPenToSquare, faAddressCard, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

const Student_Profile = () => {
    const [student, setStudent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        Std_Name: '',
        Std_Id: '',
        Std_Email: '',
        Std_DOB: '',
        Std_Gender: '',
        Std_Department: '',
        Std_Semester: '',
        Std_AdmissionYear: '',
        Std_Institute: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('https://book-zone-mern-app.onrender.com/student/me', {
                    headers: { Authorization: token }
                });
                setStudent(response.data);
                setFormData({
                    Std_Name: response.data.Std_Name,
                    Std_Id: response.data.Std_Id,
                    Std_DOB: response.data.Std_DOB,
                    Std_Gender: response.data.Std_Gender,
                    Std_Email: response.data.Std_Email,
                    Std_Department: response.data.Std_Department,
                    Std_Semester: response.data.Std_Semester,
                    Std_AdmissionYear: response.data.Std_AdmissionYear,
                    Std_Institute: response.data.Std_Institute
                });
            } catch (error) {
                alert('You need to login first');
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get('https://book-zone-mern-app.onrender.com/student/logout')
            .then(res => {
                if (res.data.json) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    navigate('/');
                    // Refresh the page after deletion
                    window.location.reload();
                }
            }).catch(err => {
                console.log(err);
            });
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");
        if (confirmDelete) {
            const token = localStorage.getItem('token');
            axios.delete(`https://book-zone-mern-app.onrender.com/student/deleteStudent/${student._id}`, {
                headers: { Authorization: token }
            })
                .then(res => {
                    localStorage.removeItem('token');
                    navigate('/');
                }).catch(err => {
                    console.log(err);
                });
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        axios.put(`https://book-zone-mern-app.onrender.com/student/updateStudent/${student._id}`, formData, {
            headers: { Authorization: token }
        })
            .then(res => {
                setStudent(res.data);
                setIsEditing(false);
            }).catch(err => {
                console.log(err);
            });
    };

    return (
        <>
            <div className="my-4" align={'right'}>
                <Link to='/Student_dash' className='btn btn-outline-dark'><FontAwesomeIcon icon={faAnglesLeft} /></Link>
                <button onClick={handleLogout} className="btn btn-outline-dark mx-2">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} /> Logout
                </button>
            </div>

            <div align='center' className='my-3'>
                {student ? (
                    <h4>Welcome {student.Std_Name}</h4>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className='form-container'>
                <div className=' card p-2 my-4' style={{ height: 'auto', width: 'auto' }}  >
                    <div className='row g-1'>
                        <button className='btn btn-outline-dark col-1 mx-1' style={{ height: 'auto', width: 'auto' }} onClick={handleEdit} align='right'>
                            <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: '18px' }} />
                        </button>
                        <button className='btn btn-outline-dark col-1 mx-1' style={{ height: 'auto', width: 'auto' }} onClick={handleDelete} align='right'>
                            <FontAwesomeIcon icon={faTrashCan} style={{ fontSize: '18px' }} />
                        </button>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleUpdate}>
                            <div className='row g-4 my-2 p-4'>
                                <div className='col-md-6'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='Std_Name'
                                        value={formData.Std_Name}
                                        onChange={handleChange}
                                        placeholder='Name'
                                        required
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='Std_Id'
                                        value={formData.Std_Id}
                                        onChange={handleChange}
                                        placeholder='Student ID'
                                        required
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='Std_DOB'
                                        value={formData.Std_DOB}
                                        onChange={handleChange}
                                        placeholder='Student DOB'
                                        required
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='Std_Gender'
                                        value={formData.Std_Gender}
                                        onChange={handleChange}
                                        placeholder='Student Gender'
                                        required
                                    />
                                </div>

                                <div className='col-md-6'>
                                    <input
                                        type='email'
                                        className='form-control'
                                        name='Std_Email'
                                        value={formData.Std_Email}
                                        onChange={handleChange}
                                        placeholder='Email'
                                        required
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='Std_Department'
                                        value={formData.Std_Department}
                                        onChange={handleChange}
                                        placeholder='Department'
                                        required
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='Std_Semester'
                                        value={formData.Std_Semester}
                                        onChange={handleChange}
                                        placeholder='Semester'
                                        required
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='Std_AdmissionYear'
                                        value={formData.Std_AdmissionYear}
                                        onChange={handleChange}
                                        placeholder='Admission Year'
                                        required
                                    />
                                </div>
                                <div className='col-md-6'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        name='Std_Institute'
                                        value={formData.Std_Institute}
                                        onChange={handleChange}
                                        placeholder='Institute'
                                        required
                                    />
                                </div>
                            </div>
                            <div align={'center'}>
                                <button type='submit' className='btn btn-outline-success mx-2 col-3'>
                                    Save
                                </button>
                                <Link to='/Student_dash' className='btn btn-outline-primary mx-2 col-3'>
                                    Cancel
                                </Link>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <div className='my-4' align='center' >
                                <FontAwesomeIcon icon={faAddressCard} style={{ fontSize: '130px' }} />
                            </div>
                            {student ? (
                                <div className='row g-3 p-4 my-4'>
                                    <p className='col-6'><strong> Name: </strong> <br /> {student.Std_Name} </p>
                                    <p className='col-6'><strong> Student ID: </strong> <br /> {student.Std_Id} </p>
                                    <p className='col-6'><strong> Date of Birth: </strong> <br /> {student.Std_DOB} </p>
                                    <p className='col-6'><strong> Gender:</strong> <br /> {student.Std_Gender}</p>
                                    <p className='col-6'><strong> Email: </strong> <br /> {student.Std_Email} </p>
                                    <p className='col-6'><strong> Department: </strong> <br /> {student.Std_Department} </p>
                                    <p className='col-6'><strong> Semester: </strong> <br /> {student.Std_Semester} </p>
                                    <p className='col-6'><strong> Admission Year: </strong> <br /> {student.Std_AdmissionYear} </p>
                                    <p className='col-6'><strong> Institute: </strong> <br /> {student.Std_Institute} </p>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Student_Profile;