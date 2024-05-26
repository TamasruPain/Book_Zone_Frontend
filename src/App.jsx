import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
// import PrivateRoute from './components/PrivateRoute/PrivateRoute'

// -------------------------------------------------------------------------------------------------------------------------

// OwnerAdmin imports
import SignUp_OwnerAdmin from "./components/manage_auth/SignUp_OwnerAdmin"
import Login_OwnerAdmin from "./components/manage_auth/Login_OwnerAdmin"
import RegisterOwnerAdmin from "./components/manage_Admins/RegiserOwnerAdmin"
import Admin_Dash from "./components/manage_Admins/Admin_Dash"
import Admin_Profile from "./components/manage_Admins/Admin_Profile"
import OwnerAdmins from "./components/manage_Admins/OwnerAdmins"
import UpdateOwnerAdmin from "./components/manage_Admins/UpdateOwnerAdmin"

// UserAdmin imports
import SignUp_UserAdmin from "./components/manage_auth/SignUp_UserAdmin"
import Login_UserAdmin from "./components/manage_auth/Login_UserAdmin"
import RegisterUserAdmin from "./components/manage_Admins/RegiserUserAdmin"
import UserAdmin_Dash from "./components/manage_Admins/UserAdmin_Dash"
import UserAdmin_Profile from "./components/manage_Admins/UserAdmin_Profile"
import UserAdmins from "./components/manage_Admins/UserAdmins"
import UpdateUserAdmin from "./components/manage_Admins/UpdateUserAdmin"

// Student imports
import Student_Dash from "./components/manage_student/Student_Dash"
import SignUp_Student from "./components/manage_auth/SignUp_Student"
import Login_Student from "./components/manage_auth/Login_Student"
import Student_Profile from "./components/manage_student/Student_Profile"
import AddStudent from "./components/manage_student/AddStudent"
import UpdateStudent from "./components/manage_student/UpdateStudent"
import ViewStudent from "./components/manage_student/ViewStudent"
import All_Student from "./components/manage_student/All_Student"
import MCA_Student from "./components/manage_student/MCA_Student"
import BCA_Student from "./components/manage_student/BCA_Student"
import BBA_Student from "./components/manage_student/BBA_Student"
import MBA_Student from "./components/manage_student/MBA_Student"
import BTech_Student from "./components/manage_student/BTech_Student"
import MTech_Student from "./components/manage_student/MTech_Student"

// Books imports
import Books from "./components/manage_books/Books"
import ALL_Books from "./components/manage_books/All_Books"
import Books_BCA from "./components/manage_books/Books_BCA"
import Books_MCA from "./components/manage_books/Books_MCA"
import Books_BTech from "./components/manage_books/Books_BTech"
import Books_MTech from "./components/manage_books/Books_MTech"
import Books_BBA from "./components/manage_books/Books_BBA"
import Books_MBA from "./components/manage_books/Books_MBA"
import AddBooks_Cards from './components/manage_books/AddBooks_Crads'
import UpdateBooks_Card from "./components/manage_books/UpdateBooks_Card"
import ViewBook from './components/manage_books/ViewBook'
import ViewBook_std from "./components/manage_books/ViewBook_std"

// Queries imports
import Manage_Query from "./components/manage_query/Manage_Query"
import MakeQuery from "./components/manage_query/MakeQuery"
import ViewQuery from "./components/manage_query/ViewQuery"

import './components/css/Admin_Dash.css';




function App() {

  return (
    <>
      <BrowserRouter>
      
        <Navbar />

        <Routes>

          {/*  ---------------------------------------------// Home //-------------------------------------------------------------------------------------------------------------------------------------------------------*/}

          <Route path="/" element={<Home />}></Route>

          {/* --------------------------------------// Owner admin Routes //-------------------------------------------------------------------------------------------------------------------------------------------------*/}

          <Route path="/owneradminregister" element={<SignUp_OwnerAdmin />}></Route>
          <Route path="/owneradminlogin" element={<Login_OwnerAdmin />}></Route>
          <Route path="/owneradmindash" element={<Admin_Dash />}></Route>
          <Route path="/admin_profile" element={<Admin_Profile />}></Route>
          <Route path='/owneradmins' element={<OwnerAdmins />}></Route>
          <Route path="/adminOwnerregister" element={<RegisterOwnerAdmin />}></Route>
          <Route path='/updateowneradmin/:id' element={<UpdateOwnerAdmin />}></Route>

          {/* ----------------------------------------// User admin Routes //------------------------------------------------------------------------------------------------------------------------------------------------*/}

          <Route path='/useradminregister' element={<SignUp_UserAdmin />}></Route>
          <Route path="/useradminlogin" element={<Login_UserAdmin />}></Route>
          <Route path='/useradmindash' element={<UserAdmin_Dash />}></Route>
          <Route path="/userAdmin_profile" element={<UserAdmin_Profile />}></Route>
          <Route path='/useradmins' element={<UserAdmins />}></Route>
          <Route path="/adminUserregister" element={<RegisterUserAdmin />}></Route>
          <Route path='/updateuseradmin/:id' element={<UpdateUserAdmin />}></Route>


          {/* ------------------------------------------// Student Routes //-------------------------------------------------------------------------------------------------------------------------------------------------*/}

          <Route path="/student_login" element={<Login_Student />}></Route>
          <Route path="/student_register" element={<SignUp_Student />}></Route>
          <Route path="/student_dash" element={<Student_Dash />}></Route>
          <Route path="/student_profile" element={<Student_Profile />}></Route>

          <Route path="/all_students" element={<All_Student />}></Route>
          <Route path="/mca_students" element={<MCA_Student />}></Route>
          <Route path="/bca_students" element={<BCA_Student />}></Route>
          <Route path="/btech_students" element={<BTech_Student />}></Route>
          <Route path="/mtech_students" element={<MTech_Student />}></Route>
          <Route path="/bba_students" element={<BBA_Student />}></Route>
          <Route path="/mba_students" element={<MBA_Student />}></Route>

          <Route path="/viewstudent/:id" element={<ViewStudent />}></Route>
          <Route path="/update_student/:id" element={<UpdateStudent />}></Route>
          <Route path="/add_student" element={<AddStudent />}></Route>


          {/* ---------------------------------------------// Book Routes //-------------------------------------------------------------------------------------------------------------------------------------------------*/}

          <Route path="/books" element={<Books />}></Route>

          <Route path="/all_books" element={<ALL_Books />}></Route>
          <Route path="/books_bca" element={<Books_BCA />}></Route>
          <Route path="/books_mca" element={<Books_MCA />}></Route>
          <Route path="/books_btech" element={<Books_BTech />}></Route>
          <Route path="/books_mtech" element={<Books_MTech />}></Route>
          <Route path="/books_bba" element={<Books_BBA />}></Route>
          <Route path="/books_mba" element={<Books_MBA />}></Route>

          <Route path="/updatebookscard/:id" element={<UpdateBooks_Card />}></Route>
          <Route path="/addbookscard" element={<AddBooks_Cards />}></Route>
          <Route path="/viewbook/:id" element={<ViewBook />}></Route>
          <Route path="/viewbookstd/:id" element={<ViewBook_std />}></Route>

          <Route path="/updatebookscard/:id" element={<UpdateBooks_Card />}></Route>
          <Route path="/addbookscard" element={<AddBooks_Cards />}></Route>
          <Route path="/viewbook/:id" element={<ViewBook />}></Route>
          <Route path="/viewbookstd/:id" element={<ViewBook_std />}></Route>


          {/* ---------------------------------------------// query Routes //------------------------------------------------------------------------------------------------------------------------------------------------*/}

          <Route path="/manage_query" element={<Manage_Query />}></Route>
          <Route path='/makeQuery' element={<MakeQuery />}></Route>
          <Route path='/viewQuery/:id' element={<ViewQuery />}></Route>


          {/*  ---------------------------------------------// END //--------------------------------------------------------------------------------------------------------------------------------------------------------*/}
          
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
