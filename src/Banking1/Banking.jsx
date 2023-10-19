import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function Banking() {
  const [items, setItems] = useState([]); // Initialize items state
  // Assuming you want to display all items initially
  const itemsToDisplay = items;

  useEffect(() => {
    axios.get('http://localhost:9090/api/admin/banking')
      .then((res) => {
        if (res.status === 200) {
          setItems(res.data);
        } else {
          alert('Error');
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
       <div className='d-flex justify-content-center'>
          <h3>Retailer Banking Information</h3>
        </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Registration Number</th>
            <th>Bank Account Number</th>
            <th>Bank Account Name</th>
            <th>IFSC Code</th>
            <th>Bank Name</th>
            <th>Branch</th>
            <th>UPI</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {itemsToDisplay.map((item, index) => (
            <tr key={index}>
              <td>{item.Reg_no}</td>
              <td>{item.Bankaccountno}</td>
              <td>{item.Bankaccountname}</td>
              <td>{item.Ifsc}</td>
              <td>{item.Bankname}</td>
              <td>{item.Branch}</td>
              <td>{item.upi}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default Banking;


