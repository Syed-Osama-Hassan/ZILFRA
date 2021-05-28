import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

const Appbar = () => {
  const history = useHistory()
  const {logout} = useAuth()

  async function handleLogout(){
    try{
      await logout()
      history.push('/login')
    }catch{
      console.log("Failed to log out")
    }
  }

  return (
    <>
      <div className="main">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand as={NavLink} style={{paddingLeft: "20px"}} to="/Home">ZILFRA</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav style={{marginLeft:"50%"}}>
              <Nav.Link>
                <NavLink style={{color: "inherit", textDecoration: "inherit", fontSize: "large"}} to="/Home">
                  Home
                </NavLink>
              </Nav.Link>
              
              <Nav.Link>
                <NavLink style={{color: "inherit", textDecoration: "inherit", fontSize: "large"}} to="/analytics">
                  Analytics
                </NavLink>
              </Nav.Link>

              <NavDropdown title="Loan" id="collasible-nav-dropdown" style={{fontSize: "large"}}>
                <NavDropdown.Item>
                  <NavLink style={{color: "inherit", textDecoration: "inherit"}} to="/Loan">
                     Manage Loans
                  </NavLink>
                </NavDropdown.Item>
                
                <NavDropdown.Item>
                  <NavLink style={{color: "inherit", textDecoration: "inherit"}} to="/Loan-Cases">
                     View Loan Requests
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink style={{color: "inherit", textDecoration: "inherit"}} to="/Contributor">
                     Contributors
                  </NavLink>
                </NavDropdown.Item>

              </NavDropdown>

              <NavDropdown title="Fund Raiser" id="collasible-nav-dropdown" style={{fontSize: "large"}}>
                <NavDropdown.Item>
                  <NavLink style={{color: "inherit", textDecoration: "inherit"}} to="/FundRaiser">
                     Manage Funds
                  </NavLink>
                </NavDropdown.Item>
                
                <NavDropdown.Item>
                  <NavLink style={{color: "inherit", textDecoration: "inherit"}} to="/FundRaiser-Cases">
                     View Funds Requests
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Draw" id="collasible-nav-dropdown" style={{fontSize: "large"}}>
                <NavDropdown.Item>
                  <NavLink style={{color: "inherit", textDecoration: "inherit"}} to="/Draw">
                     Manage Draw
                  </NavLink>
                </NavDropdown.Item>
                
                <NavDropdown.Item>
                  <NavLink style={{color: "inherit", textDecoration: "inherit"}} to="/Draw-Cases">
                     View Draw Requests
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Profile" id="collasible-nav-dropdown" style={{fontSize: "large"}}>
                <NavDropdown.Item>
                <NavLink style={{color: "inherit", textDecoration: "inherit", fontSize: "large"}} to="/update-profile">
                  Edit Profile
                </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink style={{color: "inherit", textDecoration: "inherit", fontSize: "large"}} to="#" onClick={handleLogout}>
                    Logout
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>

  );
};
export default Appbar;
