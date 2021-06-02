import React, { useState, useEffect } from "react";
import firebase from '../../firebase';
import LoanFundCard from '../Common/LoanFundCard/LoanFundCard';

const db = firebase.database().ref();

const TrendingCases = () => {
  const [loan, setLoan] = useState({});
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

  useEffect(() => {
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
  }, [])

  return (
    <>
    <div>
     <h1 className="text-center mt-5">
       Trending Cases
     </h1>
     </div>
      
     <div className="container-fluid mt-5 mb-5">
        <div className="row">
            <div className="col-10 mx-auto">
                <div className="row gy-4">
                    {
                       Object.keys(fund).slice(0,3).map(id => {
                         
                         return(
                           <LoanFundCard
                            title={fund[id].title}
                            description= {fund[id].description}
                            image={fund[id].imageURL}
                            easyPaisaAccount={fund[id].easyPaisaAccount}
                            amount={fund[id].amount}
                            key={id}
                            id={id}
                            path="FundRaiser-Cases"
                            />
                          
                         )
                       })
                    }

                    {
                       Object.keys(loan).slice(0,3).map(id => {
                         
                         return(
                           <LoanFundCard
                            title={loan[id].title}
                            description= {loan[id].description}
                            image={loan[id].imageURL}
                            easyPaisaAccount={loan[id].easyPaisaAccount}
                            amount={loan[id].amount}
                            key={id}
                            id= {id}
                            path="Loan-Cases"
                            />
                          
                         )
                       })
                    }                            
                </div>
            </div>
        </div>
    </div>

    </>
  );
};
export default TrendingCases;
