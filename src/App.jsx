import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Loan from "../src/Components/Loan/Loan";
import Contact from "./Contact";
import Service from "./Service";
import Home from "../src/Components/Home/Home";
import HomePage from "./containers/homepage/index";
import Draw from "../src/Components/Draw/Draw";
import FundRaiser from "../src/Components/FundRaiser/FundRaiser";
import Login from "./Components/login/login"
import Signup from "./Components/signup/signup"
import {AuthProvider} from "./Components/contexts/AuthContext";

const App = () => {
return(
    <>
            <AuthProvider>
            <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/Home" component={Home}/>
            <Route exact path="/Contact" component={Contact}/>
            <Route exact path="/Service" component={Service}/>
            <Route exact path="/Loan" component={Loan}/>
            <Route exact path="/FundRaiser" component={FundRaiser}/>
            <Route exact path="/Draw" component={Draw}/>
            <Redirect to = "/"></Redirect>
            </Switch>
            </AuthProvider>
    </>
);
}
export default App;