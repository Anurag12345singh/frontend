





import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
function Employee() {
  
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  // frist model state
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    qualification: '',
    address: '',
    
  });
  //second model
  const [role, setRoleData] = useState([]); // Role data
  const [selectedRole, setSelectedRole] = useState(''); 
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRolesModal, setShowRolesModal] = useState(false);
  const [userRoles, setUserRoles] = useState([]);


  useEffect(() => {
    // Fetch user data and populate the data state
    axios.get('http://localhost:9090/api/admin/viewuser')
      .then(result => setData(result.data))
      .catch(err => console.log(err));

       // Fetch role data and populate the role state
    axios.get('http://localhost:9090/api/admin/roles/view')
    .then(result => {
      setRoleData(result.data);
    })
    .catch(err => console.log(err));
  }, []);
  
  //second end
  //third model



  const handleOpenAssignModal = (user) => {
    setSelectedUser(user);
    setSelectedRole(''); // Reset the selected role when opening the modal
    setShowAssignModal(true);
  };
  const handleAssignRole = () => {
    if (!selectedRole) {
      console.error('Please select a role before assigning.');
      // Display an error message to the user or handle it appropriately.
      return;
    }
  
    // Validate that the selected role exists in the role list
    const roleExists = role.some((item) => item.roleid === selectedRole);
  
    if (!roleExists) {
      console.error('Selected role does not exist.');
      // Display an error message to the user or handle it appropriately.
    } else {
      // Proceed with the role assignment for the selected user
      axios.post('http://localhost:9090/api/admin/roleassign/grantrole', {
        uid: selectedUser.uid, // Assign the role to the selected user
        roleid: selectedRole,
      })
        .then(response => {
          console.log('Role assigned successfully');
          // Update the userRoles state with the newly assigned role
          setUserRoles([...userRoles, { roleid: selectedRole, rolename: role.find(item => item.roleid === selectedRole).rolename }]);
          setShowAssignModal(false);
        })
        .catch(error => {
          console.error('Error assigning role:', error);
        });
    }
  };
  

  const fetchUserRoles = (user) => {
    // Fetch user roles for the specified user
    axios.get(`http://localhost:9090/api/user/roleassign/getroleAssign/${user.uid}`)
      .then(response => {
        setUserRoles(response.data);
        setSelectedUser(user);
        setShowRolesModal(true);
      })
      .catch(error => {
        console.error('Error fetching user roles:', error);
      });
  };


 // Define a function to revoke a role using user ID and role name
const revokeRole = (user, rolename) => {
    // Make an API request to revoke the role
    axios.delete(`http://localhost:9090/api/admin/roleassign/revokeroles/${user.uid}/${rolename}`)
      .then(response => {
        // Update the userRoles state to remove the revoked role
        const updatedUserRoles = userRoles.filter(userRole => userRole.rolename !== rolename);
        setUserRoles(updatedUserRoles);
        console.log('Role revoked successfully');
      })
      .catch(error => {
        console.error('Error revoking role:', error);
      });
  };
  
  // third end model



  

 

  const handleStatusToggle = (item) => {
    const updatedData = data.map((user) => {
      if (user.uid === item.uid) {
        return {
          ...user,
          status: user.status === 'active' ? 'deactive' : 'active',
        };
      }
      return user;
    });

    setData(updatedData);


    axios.put(`http://localhost:9090/api/admin/updatestatus/${item.uid}`, {
      status: item.status === 'active' ? 'deactive' : 'active',
    })
      .then((response) => {
        console.log('User status updated:', response.data);
      })
      .catch((error) => {
        console.error('Error updating user status:', error);
        // Revert the status change if the API request fails
        setData(data.map((user) => (user.uid === item.id ? { ...user, status: item.status } : user)));
      });
  };
  // frist model code function
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      qualification: user.qualification,
      address: user.address,

    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
    setFormData({
      name: '',
      email: '',
      qualification: '',
      address: '',
    
    });
  };


  const handleUpdateUser = () => {
    
    axios
      .put(`http://localhost:9090/api/admin/updateuser/${selectedUser.uid}`, formData)
      .then((response) => {
        console.log('User updated successfully:', response.data);
       
        const updatedData = data.map((user) =>
          user.uid === selectedUser.uid ? { ...user, ...formData } : user
        );
        setData(updatedData);
      
        handleCloseEditModal();
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      
      });
  };
  /////role assign

  /////
  //second
  
  //endsecond

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredData = data.filter((item) => (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
    ));
    setData(filteredData);
  };


  return (
    <>
      <div className='px-5 py-3'>
        <div className='d-flex justify-content-center'>
          <h3>User List</h3>
        </div>
        <Link to='/create' className='btn btn-success'>
          Add User
        </Link>
        <div className="container-fluid">
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              style={{ marginLeft: "70%", marginBottom: "10px" }}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button style={{ marginBottom: "10px" }} className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>User id</th>
              <th>Name</th>
              <th>Photo</th>
              <th>Email</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={index}>
                <td>{item.uid}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    style={{ height: '40px', width: '30px', borderRadius: '40%' }}
                    src={`http://localhost:9090/uploads/${item.photo}`}
                    alt=''
                  />
                </td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>
                  <Toggle
                    id={`status-toggle-${item.uid}`}
                    name='status'
                    defaultChecked={item.status === 'active'}
                    onChange={() => handleStatusToggle(item)}
                    className={item.status === 'active' ? 'active-toggle' : 'inactive-toggle'}
                  />

                </td>
                <td>
                  <Link
                    onClick={() => handleEditClick(item)} // Open the edit modal
                    className='btn btn-primary btn-sm me-1'
                  >
                    Edit
                  </Link>
                </td>

                <td>
                <Button variant="primary" onClick={() => handleOpenAssignModal(item)}
                className='btn btn-primary btn-sm me-1'>
                    Assign 
                  </Button>
                  <Button
                  variant="info"
                  onClick={() => fetchUserRoles(item)}
                  className='btn btn-primary btn-sm me-1' >
                  View 
                </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Edit User frist Modal */}
        {selectedUser && (
          <Modal show={showEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>


                <div className="mb-3">
                  <label htmlFor="qualification" className="form-label">Qualification</label>
                  <input
                    type="text"
                    className="form-control"
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={handleCloseEditModal}>Close</button>
              <button className="btn btn-primary" onClick={handleUpdateUser}>Update</button>
            </Modal.Footer>
          </Modal>
        )}








       {/* model second */}


       <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Role to {selectedUser?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Selected User Id: {selectedUser?.uid}</p>
          <p>Selected User: {selectedUser?.name}</p>
          <p>Selected Role: {selectedRole ? role.find(item => item.roleid === selectedRole)?.rolename : 'Select a Role'}</p>
          <Form.Select
            onChange={(e) => setSelectedRole(e.target.value)}
            value={selectedRole}
          >
            <option value="">Select Role</option>
            {role.map((item) => (
              <option  value={item.roleid}>
                {item.rolename}
              </option>
            ))}
          </Form.Select>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              // Handle the role assignment
              handleAssignRole(selectedUser, selectedRole);
            }}
          >
            Assign Role
          </Button>
        </Modal.Footer>
      </Modal>

 {/* Modal for Viewing User Roles */}
<Modal show={showRolesModal} onHide={() => setShowRolesModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>User Roles for {selectedUser?.name}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <h2>User Roles for User ID {selectedUser?.uid}</h2>
    <ul>
      {userRoles.map((role, index) => (
        <li key={index} className="d-flex justify-content-between align-items-center">
          <span>{role}</span>
          <Button
            variant="danger"
            onClick={() => revokeRole(selectedUser, role)}
          >
            Revoke Role
          </Button>
        </li>
      ))}
    </ul>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowRolesModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
       
       {/* model second end */}
       {/* model third */}
      
       {/* model  third end */}
        <nav aria-label='Page navigation example'>
          <ul className='pagination'>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <a
                className='page-link'
                href='#'
                aria-label='Previous'
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <span aria-hidden='true'>&laquo;</span>
              </a>
            </li>
            {Array.from({ length: totalPages }, (v, i) => (
              <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
                <a
                  className='page-link'
                  href='#'
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </a>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <a
                className='page-link'
                href='#'
                aria-label='Next'
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <span aria-hidden='true'>&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Employee;



























