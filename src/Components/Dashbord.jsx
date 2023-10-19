import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet,  } from 'react-router-dom'
import { Navbar, NavDropdown, Container } from 'react-bootstrap'

function Dashboard() {
	return (

		<div>
			<Navbar className="bg-info" style={{ height: '60px' }}>

				<Container>
					<Navbar.Brand href="#home">
						<img
							src="pngwing.com.png"
							width="80" // Increase this value to make the image larger
							height="80" // Increase this value to make the image larger
							className="d-inline-block align-top"
							alt="React Bootstrap logo"
						/>
					</Navbar.Brand>

					<Navbar.Collapse className="justify-content-end">

						<NavDropdown title="Dropdown" id="basic-nav-dropdown" style={{ color: 'white' }}>
							<NavDropdown.Item href="#">profile</NavDropdown.Item>
							<NavDropdown.Item href="#">
								Edit
							</NavDropdown.Item>
							<NavDropdown.Item href="#">logout</NavDropdown.Item>

						</NavDropdown>

					</Navbar.Collapse>

				</Container>
			</Navbar>

			<div className="container-fluid">
				<div className="row flex-nowrap">
					<div className="col-auto col-md-2 col-xl-2 px-sm-2 px-0 bg-dark">
						<div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
							<a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
								<span className="fs-7 fw-bolder d-none d-sm-inline"> Dashboard</span>
							</a>
							<ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
								<li>
									<Link to="/" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
										<i className="fs-8 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </Link>
								</li>
								<li>
									<Link to="/employee" className="nav-link px-0 align-middle text-white">
										<i className="fs-8 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Users</span> </Link>
								</li>
								<li>
									<Link to="/profile" className="nav-link px-0 align-middle text-white">
										<i className="fs-8 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Role</span></Link>
								</li>
								
								<li>
									<Link to="/category" className="nav-link px-0 align-middle text-white">
										<i className="fs-8 bi-grid"></i> <span className="ms-1 d-none d-sm-inline">Category</span></Link>
								</li>
								<li>
									<Link to="/SubCategory" className="nav-link px-0 align-middle text-white">
										<i className="fs-8 bi bi-cc-square-fill"></i> <span className="ms-1 d-none d-sm-inline">Subcategory</span></Link>
								</li>
								<li>
									<Link to="/   " className="nav-link px-0 align-middle text-white">
										<i className="fs-8 bi-bi bi-bank2"></i> <span className="ms-1 d-none d-sm-inline">Retailer</span></Link>
								</li>
								<li>
									<Link to="/   " className="nav-link px-0 align-middle text-white">
										<i className="fs-8 bi bi-person-circle"></i> <span className="ms-1 d-none d-sm-inline">Customer</span></Link>
								</li>
								<li>
									<Link to="/offers  " className="nav-link px-0 align-middle text-white">
										<i className="fs-8 bi bi-cart3"></i> <span className="ms-1 d-none d-sm-inline">Offer</span></Link>
								</li>
								<li>
									<Link to="/banking  " className="nav-link px-0 align-middle text-white">
										<i className="bi bi-piggy-bank-fill"></i> <span className="ms-1 d-none d-sm-inline">Banking</span></Link>
								</li>
								<li>
									<Link to="/   " className="nav-link px-0 align-middle text-white">
										<i className="fs-8 bi-grid"></i> <span className="ms-1 d-none d-sm-inline">Other</span></Link>
								</li>

					         </ul>
						</div>
					</div>
					<div class="col p-0 m-0">
						{/* <div className='p-2 d-flex justify-content-center shadow'>
						<h4>Employee Management System</h4>						
					</div> */}
						<Outlet />
					</div>
				</div>
			</div>


		</div>

	)
}

export default Dashboard
