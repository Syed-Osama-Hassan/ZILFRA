import React from "react";
import FrForm from "./FrForm";
import FrCases from "./FrCases";
import Cases from "../Cases/Cases";
import firebase from '../../firebase';

const db = firebase.database();

const FundRaiser = () => {
  // Adding to database
  const addOrEdit = obj => {
    const dbRef = db.ref();
    dbRef.child('fund-raise').push(
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
<FrForm addOrEdit={addOrEdit}/>
<FrCases/>
<div className="row">
        <Cases />
        <Cases />
        <Cases />
      </div>
</>
);
}
export default FundRaiser;