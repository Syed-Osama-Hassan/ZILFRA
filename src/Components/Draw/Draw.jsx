import React from "react";
import DCases from "./DCases";
import DForm from "./DForm";
import firebase from '../../firebase';

const db = firebase.database();

const Draw = () => {
  // Adding to database
  const addOrEdit = obj => {
    const dbRef = db.ref();
    dbRef.child('draw').push(
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
  <DForm addOrEdit={addOrEdit}/>
  <DCases/>
</>
);
}
export default Draw;