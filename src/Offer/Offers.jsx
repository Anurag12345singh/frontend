import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from 'react-router-dom';

import './offer.css';

function Offers() {
  const [offers, setOffers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(4);
  const [data, setData] = useState({
    // ... your data fields ...
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:9090/api/admin/offer/createoffer', data)
      .then((res) => {
        console.log('Offer added successfully');
        navigate('/Offer');
      })
      .catch((err) => {
        console.error('Error creating offer:', err);
      });
  };

  useEffect(() => {
    const apiUrl = 'http://localhost:9090/api/admin/offer/viewoffer';

    axios
      .get(apiUrl)
      .then((response) => {
        setOffers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleStatusToggle = (offerId) => {
    const updatedOffers = offers.map((offer) => {
      if (offer.offerid === offerId) {
        return {
          ...offer,
          status: offer.status === 'Active' ? 'Inactive' : 'Active',
        };
      }
      return offer;
    });

    setOffers(updatedOffers);
  };

  const filteredOffers = offers.filter((offer) =>
    offer.offername.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOffers.length / perPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, filteredOffers.length);
  const offersToDisplay = filteredOffers.slice(startIndex, endIndex);

  return (
    <div >
      <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="home" title="View">
          <div className='offer'>
            <h2 className='offer-title'>Offer List</h2>
          </div>

          {/* Search bar */}
          <form className="form-inline" onSubmit={handleSubmit}>
            <button
              className="btn btn-outline-success search-button-left"
              type="submit"
            >
              Search
            </button>
            <input
              className="form-control"
              type="search"
              placeholder="Search by offer name"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          <table className='table table-bordered'>
            <thead>
              <tr>
                <th className='table-header'>Offer Name</th>
                <th className='table-header'>Percentage Discount</th>
                <th className='table-header'>Flat Discount</th>
                <th className='table-header'>Upto Discount</th>
                <th className='table-header'>Valid From</th>
                <th className='table-header'>Valid To</th>
                <th className='table-header'>Subcategory ID</th>
                <th className='table-header'>Terms and Condition</th>
                <th className='table-header'>Status</th>
              </tr>
            </thead>
            <tbody>
              {offersToDisplay.map((offer) => (
                <tr key={offer.offerid}>
                  <td>{offer.offername}</td>
                  <td>{offer.percentage_discount}</td>
                  <td>{offer.flat_discount}</td>
                  <td>{offer.upto_discount}</td>
                  <td>{offer.valid_from}</td>
                  <td>{offer.valid_to}</td>
                  <td>{offer.Subcategoryid}</td>
                  <td>{offer.terms_and_condition}</td>
                  <td>
                    <button
                      className={`btn btn-toggle ${offer.status === 'Active' ? 'btn-success' : 'btn-danger'
                        }`}
                      onClick={() => handleStatusToggle(offer.offerid)}
                    >
                      {offer.status === 'Active' ? 'Active' : 'Dactive'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className='pagination-container'>
            <nav aria-label='Page navigation'>
              <ul className='pagination'>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className='page-link'
                    onClick={() => handlePageChange(currentPage - 1)}
                   
                  >
                   <span aria-hidden='true'>&laquo;</span>
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''
                      }`}
                  >
                    <button
                      className='page-link'
                      onClick={() => handlePageChange(index + 1)}
                    >
                      
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${currentPage === totalPages ? 'disabled' : ''
                    }`}
                >
                  <button
                    className='page-link'
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                     <span aria-hidden='true'>&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

        </Tab>
        <Tab eventKey="profile" title="ADD">
          {/* ... Your add offer form ... */}
          <div className="table4 tblbackground text-center d-flex flex-column align-items-center pt-4"style={{marginLeft:"20%"}}>
            <h2>Add Offers</h2>
            <form className="row g-3 w-100" onSubmit={handleSubmit}>
              <div className="col-6">
                <label htmlFor="inputOfferid" className="form-label">
                  Offer ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputOfferid"
                  placeholder="Enter Offer ID"
                  autoComplete="off"
                  value={data.offerid}
                  onChange={(e) => setData({ ...data, offerid: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputOffername" className="form-label">
                  Offer Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputOffername"
                  placeholder="Enter Offer Name"
                  autoComplete="off"
                  value={data.offername}
                  onChange={(e) => setData({ ...data, offername: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputPercentageDiscount" className="form-label">
                  Percentage Discount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputPercentageDiscount"
                  placeholder="Enter Percentage Discount"
                  autoComplete="off"
                  value={data.percentage_discount}
                  onChange={(e) =>
                    setData({ ...data, percentage_discount: e.target.value })
                  }
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputFlatDiscount" className="form-label">
                  Flat Discount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputFlatDiscount"
                  placeholder="Enter Flat Discount"
                  autoComplete="off"
                  value={data.flat_discount}
                  onChange={(e) => setData({ ...data, flat_discount: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputUptoDiscount" className="form-label">
                  Upto Discount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputUptoDiscount"
                  placeholder="Enter Upto Discount"
                  autoComplete="off"
                  value={data.upto_discount}
                  onChange={(e) => setData({ ...data, upto_discount: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputValidFrom" className="form-label">
                  Valid From
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputValidFrom"
                  autoComplete="off"
                  value={data.valid_from}
                  onChange={(e) => setData({ ...data, valid_from: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputValidTo" className="form-label">
                  Valid To
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="inputValidTo"
                  autoComplete="off"
                  value={data.valid_to}
                  onChange={(e) => setData({ ...data, valid_to: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputSubcategoryid" className="form-label">
                  Subcategory ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputSubcategoryid"
                  placeholder="Enter Subcategory ID"
                  autoComplete="off"
                  value={data.Subcategoryid}
                  onChange={(e) =>
                    setData({ ...data, Subcategoryid: e.target.value })
                  }
                />
              </div>
              <div className="col-6" style={{marginBottom:"20px"}}>
                <label htmlFor="inputTermsCondition" className="form-label">
                  Terms and Condition
                </label>
                <textarea
                  className="form-control"
                  id="inputTermsCondition"
                  rows="4"
                  placeholder="Enter Terms and Condition"
                  value={data.terms_and_condition}
                  onChange={(e) =>
                    setData({ ...data, terms_and_condition: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="col-6">
                <label htmlFor="inputStatus" className="form-label">
                  Status
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputStatus"
                  placeholder="Enter Status"
                  autoComplete="off"
                  value={data.status}
                  onChange={(e) => setData({ ...data, status: e.target.value })}
                />
              </div>
              <div className="col-6">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Tab>
        <Tab eventKey="contact" title="" disabled>
          Tab content for Contact
        </Tab>
      </Tabs>
    </div>
  );
}

export default Offers;

