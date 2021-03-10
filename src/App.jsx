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
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword"
import Error from "./Components/Error/Error"
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile"
import {AuthProvider} from "./Components/contexts/AuthContext";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute"

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
            <PrivateRoute  exact path="/Contact" component={Contact}/>
            <PrivateRoute  exact path="/Service" component={Service}/>
            <PrivateRoute  exact path="/Loan" component={Loan}/>
            <PrivateRoute  exact path="/FundRaiser" component={FundRaiser}/>
            <PrivateRoute path="/update-profile" component={UpdateProfile}/>
            <PrivateRoute  exact path="/Draw" component={Draw}/>
            <Route path="*" component={Error}/>
            </Switch>
            </AuthProvider>
    </>
);
}
export default App;