import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Dashbord'
import Employee from './Components/Employee'
import Home from './Components/Home'
import AddEmployee from './Components/AddEmployee'
import Profile from './Role/Profile'
import 'bootstrap/dist/css/bootstrap.min.css';
import Category from './category/Category'
import EditCategory from './category/EditCategory'
import SubCategory from './subCategory/SubCategory'
import EditSubCategory from './subCategory/EditSubCategory'
import Offers from './Offer/Offers'
import EditRole from './Role/EditRole'
import EditUser from "./Components/EditUser"
import Banking1 from './Banking1/Banking'

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path='/' element={<Dashboard/>}>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/employee' element={<Employee/>}></Route>
          <Route path='/users/:uid' element={<EditUser/>}></Route> 
          <Route path='/create' element={<AddEmployee/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
           <Route path='/EditRole/:roleid' element={<EditRole/>}></Route> 
          <Route path='/category' element={<Category/>}></Route>
          <Route path='/editCategory/:Pcategoryid' element={<EditCategory/>}></Route>
          <Route path='/SubCategory' element={<SubCategory />}></Route>
           <Route path='/editSubCategory/:Subcategoryid' element={<EditSubCategory />}></Route>
           <Route path='/offers' element={<Offers />}></Route>
           <Route path='/banking' element={<Banking1 />}></Route>
           
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App