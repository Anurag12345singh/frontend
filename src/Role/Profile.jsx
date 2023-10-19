import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './profile.css';

function Profile() {
  const [data, setData] = useState({
    roleid: '',
    rolename: '',
  });

  const [errors, setErrors] = useState({
    roleid: '',
    rolename: '',
  });

  const [item, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    axios
      .post('http://localhost:9090/api/admin/roles/newrole', data)
      .then((res) => {
        navigate('/category');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get('http://localhost:9090/api/admin/roles/view')
      .then((res) => {
        if (res.status === 200) {
          setItem(res.data);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Calculate the start and end indices for displaying items on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter items based on the search query
  const filteredItems = item.filter((product) => {
    return (
      product.roleid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.rolename.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Update displayed items based on the filtered items
  const displayedItems = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = () => {
    // Search logic is already handled by filteredItems state.
    // No additional code needed here.
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div className="Role">
          <Form onSubmit={handleSubmit}>
            <h4>Add New</h4>
            <br />
            <Form.Label>
              <h6>Role id</h6>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Role Id"
              onChange={(e) => setData({ ...data, roleid: e.target.value })}
            />
            <div className="text-danger">{errors.roleid}</div>
            <br />
            <Form.Label>
              <h6>Role name</h6>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Role Name"
              onChange={(e) => setData({ ...data, rolename: e.target.value })}
            />
            <div className="text-danger">{errors.rolename}</div>
            <Button className="btnrole" variant="info" type="submit">
              Save
            </Button>
            <br />
          </Form>
        </div>

        <div className="table4">
          <h4> Role List</h4>
          <br />
          <div class="container-fluid">
            <form class="d-flex">
              <input
                style={{ marginBottom: "10px", marginLeft: "150px" }}
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                style={{ marginBottom: "10px" }}
                class="btn btn-outline-success"
                type="button"
                onClick={() => handleSearch()}
              >
                Search
              </button>
            </form>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Role id</th>
                <th>Role name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedItems.map((product, index) => (
                <tr key={index}>
                  <td>{product.roleid}</td>
                  <td>{product.rolename}</td>
                  <td className="centered-button">
                    <Link
                      to={`/EditRole/` + product.roleid}
                      className="btn btn-primary"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination controls */}
          <div className="pagination-container">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
              >
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {Array.from(
                { length: Math.ceil(filteredItems.length / itemsPerPage) },
                (_, index) => (
                  <li
                    key={index}
                    className={`page-item ${
                      currentPage === index + 1 ? 'active' : ''
                    }`}
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage === Math.ceil(filteredItems.length / itemsPerPage)
                    ? 'disabled'
                    : ''
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

