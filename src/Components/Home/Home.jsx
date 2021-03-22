import React from "react";
import Zilfra from "../../Images/Zilfra.png";
import "../../styles.css";
import TrendingCases from "../TrendingCases/TrendingCases";
import Appbar from "../NavBar/NavBar";

const Home = () => {
  return (
    <>
    <Appbar /> 
      <br />
      <section id="header" className="d-flex align-items-center">
        <div className="container fluid nav_bg">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="row">
                <div className="col-md-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex justify-content-center flex-column">
                  <h1 className="brandName">
                    {" "}
                    <strong> Zilfra </strong> <br /> The Financial Stability
                    Trio
                  </h1>
                  <h2 className="my-3">
                    {" "}
                    Let us deal with your financial matters{" "}
                  </h2>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 header-img">
                  <img
                    src={Zilfra}
                    className="img-fluid animated"
                    alt="home img"
                  />
                </div>
                </div>
              <br />
              <TrendingCases />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
