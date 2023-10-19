import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
function AddEmployee() {
  const [data, setData] = useState({
    uid: '',
    name: '',
    email: '',
    password: '',
    mobile: '',
    photo: '',
    aadhar: '',
    doj: '',
    qualification: '',
    dob: '',
    address: '',
    city: '',
    pin: '',
    status: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("uid", data.uid);
    formdata.append("name", data.name);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("mobile", data.mobile);
    formdata.append("photo", data.photo);
    formdata.append("aadhar", data.aadhar);
    formdata.append("doj", data.doj);
    formdata.append("qualification", data.qualification);
    formdata.append("dob", data.dob);
    formdata.append("address", data.address);
    formdata.append("city", data.city);
    formdata.append("pin", data.pin);
    formdata.append("status", data.status);

    axios.post('http://localhost:9090/api/admin/adduser', formdata)
      .then(res => {
        navigate('/Employee'); // Navigate here when the request is successful
      })
      .catch(err => console.log(err));
  }
  const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	  };

  return (

    <div className='table4 tblbackground text-center d-flex flex-column align-items-center pt-4'style={{marginLeft:"20%"}} >
      <h1>Add Users</h1>
      <form className="row g-1 w-100" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">User id</label>
          <input type="text" className="form-control" id="inputName" placeholder='UID' autoComplete='off'
            onChange={e => setData({ ...data, uid: e.target.value })} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="form-label">Name</label>
          <input type="text" className="form-control" id="inputEmail4" placeholder='Name' autoComplete='off'
            onChange={e => setData({ ...data, name: e.target.value })} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">Email</label>
          <input type="email" className="form-control" id="inputPassword4" placeholder='Email'
            onChange={e => setData({ ...data, email: e.target.value })} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputSalary" className="form-label">Password</label>
          <input type="password" className="form-control" id="inputSalary" placeholder="Password" autoComplete='off'
            onChange={e => setData({ ...data, password: e.target.value })} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputAddress" className="form-label">Mobile</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="Mobile" autoComplete='off'
            onChange={e => setData({ ...data, mobile: e.target.value })} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputAddress" className="form-label">Date of Birth</label>
          <input type="date" className="form-control" id="inputAddress" placeholder="Date of Birth" autoComplete='off'
            onChange={e => setData({ ...data, dob: e.target.value })} />
        </div>
        <div className="col-6 mb-2">
          <label className="form-label" htmlFor="inputGroupFile01">Select Image</label>
          <input type="file" className="form-control" id="inputGroupFile01"
            onChange={e => setData({ ...data, photo: e.target.files[0] })} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputAddress" className="form-label">Aadhar</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="Aadhar" autoComplete='off'
            onChange={e => setData({ ...data, aadhar: e.target.value })} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputAddress" className="form-label">Qualification</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="Qualification" autoComplete='off'
            onChange={e => setData({ ...data, qualification: e.target.value })} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputAddress" className="form-label">Date of Join</label>
          <input type="date" className="form-control" id="inputAddress" placeholder="Date of Join" autoComplete='off'
            onChange={e => setData({ ...data, doj: e.target.value })} />
        </div>
       
        
        <div className="col-md-6">
          <label htmlFor="inputAddress" className="form-label">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="Address" autoComplete='off'
            onChange={e => setData({ ...data, address: e.target.value })} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputAddress" className="form-label">City</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="City" autoComplete='off'
            onChange={e => setData({ ...data, city: e.target.value })} />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputAddress" className="form-label">Pin</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="Pin" autoComplete='off'
            onChange={e => setData({ ...data, pin: e.target.value })} />
        </div>
        <div className="col-md-6">
        <label>Status:</label>
        <select
          name="status"
          value={data.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="deactive">Deactive</option>
        </select>
        </div>
        <div className="col-md-2 ">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
     
   </div>


   
   
  );
  
}

export default AddEmployee;
