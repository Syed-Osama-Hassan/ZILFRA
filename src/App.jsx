import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Loan from "../src/Components/Loan/Loan";
import Contact from "./Contact";
import Service from "./Service";
import NavBar from "../src/Components/NavBar/NavBar";
import Home from "../src/Components/Home/Home";
import HomePage from "./containers/homepage/index";
import Draw from "../src/Components/Draw/Draw";
import FundRaiser from "../src/Components/FundRaiser/FundRaiser";

const App = () => {
return(
<>
{/* <NavBar /> */}
<Switch>
<Route exact path="/" component={HomePage}/>
{/* <Route exact path="/" component={Home}/> */}
<Route exact path="/Contact" component={Contact}/>
<Route exact path="/Service" component={Service}/>
<Route exact path="/Loan" component={Loan}/>
<Route exact path="/FundRaiser" component={FundRaiser}/>
<Route exact path="/Draw" component={Draw}/>
<Redirect to = "/"></Redirect>
</Switch>
</>
);
}
export default App;