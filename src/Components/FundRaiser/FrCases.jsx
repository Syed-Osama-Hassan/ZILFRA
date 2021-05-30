import React, { useState, useEffect } from "react";
import Appbar from '../NavBar/NavBar';
import firebase from '../../firebase';
import LoanFundCard from "../Common/LoanFundCard/LoanFundCard";

const db = firebase.database().ref();

const FrCases = () => {
  const [fund, setFund] = useState({});

  useEffect(() => {
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
  }, [])
  
  return (
    <div>
     <Appbar />
     <div>
     <h2 className="text-center mt-5">
       Fund Cases
     </h2>
     </div>
     
     <div className="container-fluid mt-4 mb-5">
        <div className="row">
            <div className="col-10 mx-auto">
                <div className="row gy-4">
                    {
                       Object.keys(fund).map(id => {
                         return(
                           <LoanFundCard
                            title={fund[id].title}
                            description= {fund[id].description}
                            image={fund[id].imageURL}
                            easyPaisaAccount={fund[id].easyPaisaAccount}
                            amount = {fund[id].amount}
                            id= {id}
                            key={id}
                            path="FundRaiser-Cases"
                            />
                         )
                       })
                    }                    
                </div>
            </div>
        </div>
    </div>
    </div>

  );
};
export default FrCases;
