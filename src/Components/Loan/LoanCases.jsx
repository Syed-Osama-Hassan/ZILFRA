import React, { useState, useEffect} from "react";
import Appbar from "../NavBar/NavBar";
import LoanFundCard from "../Common/LoanFundCard/LoanFundCard";
import firebase from '../../firebase';

const db = firebase.database().ref();

const LoanCases = () => {
  const [loan, setLoan] = useState({});

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
    <Appbar />
     <div>
     <h2 className="text-center mt-5">
       Loan Cases
     </h2>
     </div>
     <div className="container-fluid mt-4 mb-5">
        <div className="row">
            <div className="col-10 mx-auto">
                <div className="row gy-4">
                    {
                       Object.keys(loan).map(id => {
                         return(
                           <LoanFundCard
                            title={loan[id].title}
                            description= {loan[id].description}
                            image={loan[id].imageURL}
                            easyPaisaAccount={loan[id].easyPaisaAccount}
                            amount = {loan[id].amount}
                            key={id}
                            id={id}
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
export default LoanCases;
