import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './Category.css';

function Category() {
  const [data, setData] = useState({
    Pcategoryid: '',
    categoryname: '',
  });
  const [errors, setErrors] = useState({
    Pcategoryid: '',
    categoryname: '',
  });
  const [item, setItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    axios
      .post('http://localhost:9090/api/admin/category/addcategory', data)
      .then((res) => {
        navigate('/category');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get('http://localhost:9090/api/admin/category/viewcategory')
      .then((res) => {
        if (res.status === 200) {
          setItem(res.data);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = item.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredItems = item.filter((product) => {
    return (
      product.Pcategoryid.toLowerCase().includes(searchInput.toLowerCase()) ||
      product.categoryname.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  const currentFilteredItems = filteredItems.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div className="Role1">
          <Form onSubmit={handleSubmit}>
            <h4>Add New</h4>
            <br />
            <Form.Label>
              <h6>Category Id</h6>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category Id"
              onChange={(e) => setData({ ...data, Pcategoryid: e.target.value })}
            />
            <div className="text-danger">{errors.Pcategoryid}</div>
            <br />
            <Form.Label>
              <h6>Category Name</h6>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category Name"
              onChange={(e) =>
                setData({ ...data, categoryname: e.target.value })
              }
            />
            <div className="text-danger">{errors.categoryname}</div>
            <Button className="btnrole" variant="info" type="submit">
              Save
            </Button>
            <br />
          </Form>
        </div>

        <div className="table5">
          <h4>Category List</h4>
          <br />
          <div class="container-fluid">
            <form class="d-flex">
              <input
                style={{ marginBottom: '10px', marginLeft: '150px' }}
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <button
                style={{ marginBottom: '10px' }}
                class="btn btn-outline-success"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Category Id</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentFilteredItems.map((product, index) => (
                <tr key={index}>
                  <td>{product.Pcategoryid}</td>
                  <td>{product.categoryname}</td>
                  <td className="centered-button">
                    <Link
                      to={`/editCategory/` + product.Pcategoryid}
                      className="btn btn-primary"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              {Array.from(
                { length: Math.ceil(filteredItems.length / itemsPerPage) },
                (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${
                      currentPage === i + 1 ? 'active' : ''
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage ===
                  Math.ceil(filteredItems.length / itemsPerPage)
                    ? 'disabled'
                    : ''
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredItems.length / itemsPerPage)
                  }
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Category;


