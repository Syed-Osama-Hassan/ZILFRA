import React from "react";
import LoanForm from "./LoanForm";
import LoanCases from "./LoanCases";
import firebase from '../../firebase';

const db = firebase.database();

const Loan = () => {
  // Adding to database
  const addOrEdit = obj => {
    const dbRef = db.ref();
    dbRef.child('loan').push(
      obj,
      err =>{
        if(err){
          console.log(err);
        }
      }
    )
  }

return(
  <>
  <LoanForm addOrEdit={addOrEdit}/>
  <LoanCases/>
</>
);
}
export default Loan;