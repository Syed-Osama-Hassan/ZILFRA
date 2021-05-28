import React from 'react';
import {NavLink} from 'react-router-dom';

const LoanFundCard = (props) => {
    return(
    <div className="col-md-4 col-10 mx-auto"> 
        <div class="card anim" style={{width: "20rem"}}>
            <img src={props.image}
            class="card-img-top image-fluid"
            height="300px"
            width="600px" 
            alt="..."
             />
                <div class="card-body">
                    <h5 class="card-title">{props.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">EasyPaisa Account: {props.easyPaisaAccount}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Amount: {props.amount}</h6>
                    <p class="card-text">{props.description}</p>                    
                    <NavLink to="" class="btn btn-dark mt-2">Show Details</NavLink>
                </div>
        </div>

    </div>
    );
}

export default LoanFundCard;