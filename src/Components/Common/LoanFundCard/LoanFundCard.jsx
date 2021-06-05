import React from 'react';
import {NavLink, useRouteMatch } from 'react-router-dom';

const LoanFundCard = (props) => {
   // let { path } = useRouteMatch();
   // const { url } = props.path;  // Show Details from Home
    
    return(
    <div className="col-md-4 col-10 mx-auto"> 
        <div className="card bg-light border-dark anim" style={{width: "20rem"}}>
            <img src={props.image}
            className="card-img-top image-fluid"
            height="300px"
            width="600px" 
            alt="..."
             />
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">EasyPaisa Account: {props.easyPaisaAccount}</h6>
                    <h6 className="card-subtitle mb-2 text-muted">Amount: {props.amount}</h6>
                    <p className="card-text">{props.description}</p>                    
                    <NavLink
                        to={`${props.path}/${props.id}`}
                        className="btn btn-dark mt-2">
                            Show Details
                    </NavLink>
                    
                </div>
        </div>
       
    </div>
    );
}

export default LoanFundCard;