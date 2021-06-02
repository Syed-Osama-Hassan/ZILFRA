import React, { useState, useEffect } from 'react';
import Appbar from '../../NavBar/NavBar';
import firebase from '../../../firebase';
import { useAuth } from '../../contexts/AuthContext';

const db = firebase.database().ref();

const Contributor = () => {
    const [contributors, setContributors] = useState({});
    const { currentUser } = useAuth();

    useEffect(() => {
        db.child('donation').on('value', snapshot => {
            if (snapshot.val() != null) {
                setContributors({
                    ...snapshot.val()
                })
            }
            else {
                setContributors({});
            }
        })
    }, [])
  
    return (
        <>
            <Appbar />
            <div>
                <h2 className="text-center mt-5">
                    Contributors
                </h2>
            </div>

            <div className="container-fluid mt-4 mb-5">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <div className="row gy-4">
                            {
                                Object.keys(contributors).map(id => {
                                    return (
                                        contributors[id].receiverEmail === currentUser.email ? 
                                        <div className="col-md-4 col-10 mx-auto">
                                            <div class="card bg-light border-dark anim" style={{ width: "20rem" }}>
                                                <img src={contributors[id].imageURL}
                                                    class="card-img-top image-fluid"
                                                    height="300px"
                                                    width="600px"
                                                    alt="..."
                                                />
                                                <div class="card-body">
                                                    <h5 class="card-title">Contact: {contributors[id].email}</h5>
                                                    <h6 class="card-subtitle mb-2 text-muted">Amount: {contributors[id].amount}</h6>
                                                    {/* <p class="card-text">{props.description}</p> */}

                                                </div>
                                            </div>

                                        </div> : ''
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contributor;