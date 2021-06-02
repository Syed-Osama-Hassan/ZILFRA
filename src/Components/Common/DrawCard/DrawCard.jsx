import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

const DrawCard = (props) => {
    let { path } = useRouteMatch();

    return(
    <div className="col-md-4 col-10 mx-auto"> 
        <div className="card bg-light border-dark anim" style={{width: "18rem"}}>
        <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">EasyPaisa Account: {props.easyPaisaAccount}</h6>
        <h6 className="card-subtitle mb-2 text-muted">Amount: {props.amount}</h6>
        <h6 className="card-subtitle mb-2 text-muted">Duration in Months: {props.duration}</h6>
        <p className="card-text">{props.description}</p>
        <NavLink to={`${path}/${props.id}`} className="btn btn-dark">Show Details</NavLink>
        </div>
        </div>    
    </div>
    );
}

export default DrawCard;