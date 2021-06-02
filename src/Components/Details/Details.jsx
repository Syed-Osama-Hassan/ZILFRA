import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import firebase from '../../firebase';
import NavBar from '../NavBar/NavBar';
import { NavLink } from 'react-router-dom';

const db = firebase.database().ref();

const Details = () => {
    const { id } = useParams();
    let { path } = useRouteMatch();
    const getCardType = path.slice(1, path.length - 4);
    const [loan, setLoan] = useState({});
    const [fund, setFund] = useState({});
    const [draw, setDraw] = useState({});

    useEffect(() => {
        if (getCardType === "Loan-Cases") {
            db.child('loan').on('value', snapshot => {
                if (snapshot.val() != null) {
                    setLoan({
                        ...snapshot.val()
                    })
                }
                else {
                    setLoan({});
                }
            })
        }
        else if (getCardType === "FundRaiser-Cases") {
            db.child('fund-raise').on('value', snapshot => {
                if (snapshot.val() != null) {
                    setFund({
                        ...snapshot.val()
                    })
                }
                else {
                    setFund({});
                }
            })
        }
        else{
            db.child('draw').on('value', snapshot => {
                if (snapshot.val() != null) {
                    setDraw({
                        ...snapshot.val()
                    })
                }
                else {
                    setDraw({});
                }
            })
        }
    }, [])
    
    return (
        <>
            <NavBar />
            <h2 className="display-4 text-center mt-5">Details</h2>
            {
                loan[id] !== undefined ?
                    (
                        <div className="col d-flex justify-content-center mt-4 mb-4">
                            <div className="card bg-light border-dark" style={{ width: "50rem" }}>
                                <img src={loan[id]['imageURL']}
                                    className="card-img-top image-fluid"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h4 className="card-title">{loan[id]['title']}</h4>
                                    <h6 className="card-subtitle mb-2 text-muted">EasyPaisa Account: {loan[id]['easyPaisaAccount']}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">Amount: {loan[id]['amount']}</h6>
                                    <h6 className="card-text">{loan[id]['description']}</h6>
                                    <NavLink to={`/loan/Donation/${id}/${loan[id].email}`} className="btn btn-dark mt-2 d-flex justify-content-center">Donate Now</NavLink>
                                </div>
                            </div>

                        </div>
                    ) :
                    fund[id] !== undefined ?
                        (
                            <div className="col d-flex justify-content-center mt-4 mb-4">
                            <div className="card bg-light border-dark" style={{ width: "50rem" }}>
                                <img src={fund[id]['imageURL']}
                                    className="card-img-top image-fluid"
                                    alt="..."
                                />
                                <div className="card-body">
                                    <h4 className="card-title">{fund[id]['title']}</h4>
                                    <h6 className="card-subtitle mb-2 text-muted">EasyPaisa Account: {fund[id]['easyPaisaAccount']}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted">Amount: {fund[id]['amount']}</h6>
                                    <h6 className="card-text">{fund[id]['description']}</h6>
                                    <NavLink to={`/fund/Donation/${id}/${fund[id].email}`} className="btn btn-dark mt-2 d-flex justify-content-center">Donate Now</NavLink>
                                </div>
                            </div>

                        </div>
                        ) : draw[id] !== undefined ?
                        (
                            <div className="col d-flex justify-content-center mt-4 mb-4">
                            <div className="card bg-light border-dark" style={{ width: "40rem"}}>
                                
                                <div className="card-body">
                                    <h4 className="card-title text-center">{draw[id]['title']}</h4><br/>
                                    <h5 className="card-subtitle mb-2 text-muted">Contact: {draw[id]['email']}</h5>
                                    <h5 className="card-subtitle mb-2 text-muted">EasyPaisa Account: {draw[id]['easyPaisaAccount']}</h5>
                                    <h5 className="card-subtitle mb-2 text-muted">Amount: {draw[id]['amount']}</h5>
                                    <h5 className="card-subtitle mb-2 text-muted">Duration: {draw[id]['duration']} Months</h5>
                                    <h5 className="card-subtitle mb-2 text-muted">Per Month Charges: {Math.round(draw[id]['amount']/draw[id]['duration'])}</h5>
                                    <br/>
                                    <h6 className="card-text">{draw[id]['description']}</h6>
                                    <NavLink to={`/Participate/${id}`} className="btn btn-dark mt-4 d-flex justify-content-center">Participate Now</NavLink>
                                </div>
                            </div>

                        </div>
                        ): ''

            }
        </>
    );
}

export default Details;