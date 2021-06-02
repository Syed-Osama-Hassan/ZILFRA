import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Loan from "../src/Components/Loan/Loan";
import LoanCases from "../src/Components/Loan/LoanCases";
import Contributors from "../src/Components/Loan/Contributors/Contributors";
import Contact from "./Contact";
import Service from "./Service";
import Home from "../src/Components/Home/Home";
import HomePage from "./containers/homepage/index";
import Draw from "../src/Components/Draw/Draw";
import DCases from "../src/Components/Draw/DCases";
import FundRaiser from "../src/Components/FundRaiser/FundRaiser";
import FrCases from "../src/Components/FundRaiser/FrCases";
import Login from "./Components/login/login"
import Signup from "./Components/signup/signup"
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword"
import Analytics from "./Components/Analytics/Analytics"
import Error from "./Components/Error/Error";
import Details from './Components/Details/Details';
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile"
import {AuthProvider} from "./Components/contexts/AuthContext";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute"
import Donations from './Components/Donations/Donations'
import Participation from './Components/Participate/Participate';

const App = () => {
return(
    <>
            <AuthProvider>
            <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute exact path="/Home" component={Home}/>
            <PrivateRoute exact path="/Home/:id" component={Details} />
            <PrivateRoute  exact path="/Contact" component={Contact}/>
            <PrivateRoute  exact path="/Service" component={Service}/>
            <PrivateRoute  exact path="/Loan" component={Loan}/>
            <PrivateRoute  exact path="/Contributor" component={Contributors}/>
            <PrivateRoute exact path="/Loan-Cases" component={LoanCases}/>
            <PrivateRoute exact path="/Loan-Cases/:id" component={Details} />
            <PrivateRoute  exact path="/FundRaiser" component={FundRaiser}/>
            <PrivateRoute  exact path="/FundRaiser-Cases" component={FrCases}/>
            <PrivateRoute exact path="/FundRaiser-Cases/:id" component={Details} />
            <PrivateRoute path="/update-profile" component={UpdateProfile}/>
            <PrivateRoute  exact path="/Draw" component={Draw}/>
            <PrivateRoute  exact path="/Draw-Cases" component={DCases}/>
            <PrivateRoute exact path="/Draw-Cases/:id" component={Details} />
            <PrivateRoute  exact path="/Analytics" component={Analytics}/>
            <PrivateRoute exact path="/loan/Donation/:id" component={Donations}/>
            <PrivateRoute exact path="/fund/Donation/:id" component={Donations}/>
            <PrivateRoute exact path="/Participate/:id" component={Participation}/>
            <Route path="*" component={Error}/>
            </Switch>
            </AuthProvider>
    </>
);
}
export default App;