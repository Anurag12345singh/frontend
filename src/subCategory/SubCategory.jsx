import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import './subCategory.css';

function SubCategory() {
    const [data, setData] = useState({
        Pcategoryid: '',
        subcategoryid: '',
        subcategoryname: '',
        photo: null,
    });

    const [item, setItem] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    // Handle file input change
    const handleChange = (e) => {
        // Set the selected file in the state
        setData({ ...data, photo: e.target.files[0] });
    };

    // Handle form submission
    const handlefileSubmit = (e) => {
        e.preventDefault();

        // Create FormData object and append form data
        const formData = new FormData();
        formData.append('Pcategoryid', data.Pcategoryid);
        formData.append('subcategoryid', data.subcategoryid);
        formData.append('subcategoryname', data.subcategoryname);
        formData.append('photo', data.photo);

        axios
            .post('http://localhost:9090/api/admin/subcategory/addsubcategory', formData)
            .then((res) => {
                // Handle success (e.g., navigate to another page)
                console.log('Data posted successfully', res.data);
                // You can add code to navigate to another page here
            })
            .catch((err) => {
                // Handle error
                console.error('Error posting data:', err);
            });
    };


    useEffect(() => {
        axios
            .get('http://localhost:9090/api/admin/subcategory/viewsubcategory')
            .then((res) => {
                if (res.status === 200) {
                    setItem(res.data);
                    setFilteredItems(res.data); // Initialize filteredItems with all items
                } else {
                    alert('Error');
                }
            })
            .catch((err) => console.log(err));
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        filterItems(query);
    };

    // Filter items based on search query
    const filterItems = (query) => {
        const filtered = item.filter((subcategory) => {
            return (
                subcategory.Pcategoryid.toLowerCase().includes(query.toLowerCase()) ||
                subcategory.subcategoryid.toLowerCase().includes(query.toLowerCase()) ||
                subcategory.subcategoryname.toLowerCase().includes(query.toLowerCase())
            );
        });
        setFilteredItems(filtered);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        // Handle the selected file here
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
    };

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get the items to display on the current page
    const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div className="Role">
                    <Form onSubmit={handlefileSubmit}>
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
                        {/* <div className="text-danger">{errors.Pcategoryid}</div> */}

                        <Form.Label>
                            <h6>Subcategory Id</h6>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Subcategory Id"
                            onChange={(e) => setData({ ...data, subcategoryid: e.target.value })}
                        />
                        {/* <div className="text-danger">{errors.subcategoryid}</div> */}

                        {/* <Form.Label>
                            <h6>Subcategory Name</h6>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Subcategory Name"
                            onChange={(e) => setData({ ...data, subcategoryname: e.target.value })}
                        /> */}
                        <Form.Group>
                            <Form.Label><h6>Subcategory Name</h6></Form.Label>
                            <Form.Select
                                onChange={(e) => setData({ ...data, subcategoryname: e.target.value })}
                            >
                                <option value="">Select a Subcategory</option>
                                <option value="Option 1">Sport</option>
                                <option value="Option 2">Electric</option>
                                <option value="Option 3">Clothes</option>
                                {/* Add more options as needed */}
                            </Form.Select>
                        </Form.Group>


                        {/* <div className="text-danger">{errors.subcategoryname}</div> */}

                        <Form.Label>
                            <h6>Photo</h6>
                        </Form.Label>
                        <Form.Control
                            type="file"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleChange} // Handle file input change
                        />
                        {/* <div className="text-danger">{errors.photo}</div> */}

                        <br />

                        <Button className="btnrole" variant="info" type="submit">
                            Save
                        </Button>
                        <br />
                    </Form>
                </div>

                <div className="table6">
                    <h4>Category List</h4>
                    <br />
                    <div className="container-fluid">
                        <form className="d-flex">
                            <input
                                style={{ marginBottom: '10px', marginLeft: '150px' }}
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchChange} // Handle search input change
                            />
                            <button
                                style={{ marginBottom: '10px' }}
                                className="btn btn-outline-success"
                                type="button"
                                onClick={() => filterItems(searchQuery)} // Filter items on button click
                            >
                                Search
                            </button>
                        </form>
                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Category Id</th>
                                <th>Subcategory Id</th>
                                <th>Subcategory Name</th>
                                <th>Photo</th>
                                <th>Added On</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemsToDisplay.map((subcategory, index) => (
                                <tr key={index}>
                                    <td>{subcategory.Pcategoryid}</td>
                                    <td>{subcategory.subcategoryid}</td>
                                    <td>{subcategory.subcategoryname}</td>
                                    <td>
                                        <img
                                            style={{ height: '40px', width: '30px', borderRadius: '40%' }}
                                            src={`http://localhost:9090/uploads/${subcategory.photo}`}
                                            alt=""


                                        />


                                    </td>
                                    <td>{subcategory.addedon}</td>
                                    <td>
                                        <Link
                                            to={`/editSubcategory/` + subcategory.subcategoryid}
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
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={() => handlePageChange(currentPage - 1)}>
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            {Array.from({ length: totalPages }, (v, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <a className="page-link" href="#" onClick={() => handlePageChange(i + 1)}>
                                        {i + 1}
                                    </a>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default SubCategory;





