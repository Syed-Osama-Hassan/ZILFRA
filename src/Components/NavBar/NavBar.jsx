import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


const Navbar = () => {
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
      <div className="container-fluid nav_bg">
        <div className="row">
          <div className="col-12 mx-auto">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="container-fluid">
                <NavLink
                  className="navbar-brand"
                  style={{ float: "right" }}
                  to="/Home"
                >
                  ZILFRA
                </NavLink>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavAltMarkup"
                  aria-controls="navbarNavAltMarkup"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  
                >
                  <span class="navbar-toggler-icon"></span>
                </button>

                {/* this will show in small screen */}
                <div class="collapse" id="navbarNavAltMarkup">
                  <div class="bg-dark p-4">
                  <ul className="navbar-nav" style={{ marginLeft: "auto" }}>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        to="/Home"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link active" to="/Loan">
                        Loaning
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        to="/FundRaiser"
                      >
                        Fund Raisers
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        to="/Draw"
                      >
                        Draw
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        to="/update-profile"
                      >
                        Profile
                      </NavLink>
                      </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        to="#"
                        onClick={handleLogout}
                      >
                        Log Out
                      </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>


                {/* For large screen */}

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav" style={{ marginLeft: "auto" }}>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        to="/Home"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link active" to="/Loan">
                        Loaning
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        to="/FundRaiser"
                      >
                        Fund Raisers
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        to="/Draw"
                      >
                        Draw
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        to="/update-profile"
                      >
                        Profile
                      </NavLink>
                      </li>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        to="#"
                        onClick={handleLogout}
                      >
                        Log Out
                      </NavLink>
                    </li>
                  </ul>
                </div>


              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
