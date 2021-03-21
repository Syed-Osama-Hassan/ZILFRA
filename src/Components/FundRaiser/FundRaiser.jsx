import React, { useState, useEffect} from "react";
import FrForm from "./FrForm";
import FrCases from "./FrCases";
import Cases from "../Cases/Cases";
import firebase from '../../firebase';
import { Container, Button } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext';

const db = firebase.database().ref();
const dbStorage = firebase.storage();

const FundRaiser = () => {
  const [fundObjects, setfundObjects] = useState({});
  const [currentId, setCurrentId] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    db.child('fund-raise').on('value', snapshot =>{
      if(snapshot.val() !== null){
        setfundObjects({
          ...snapshot.val()
        })
      }
      else{
        setfundObjects({});
      }
    })
  }, [])

  // Adding to database
  const addOrEdit = (obj, url) => {
    var data = {...obj, imageURL: url};

    if(currentId == ''){
      // Add new data
      db.child('fund-raise').push(
        data,
        err =>{
          if(err){
            console.log(err);
          }
          else{
            setCurrentId('');
          }
        }
      )
      }
      // edit data
      else{
        // Delete old photo
        if(fundObjects[currentId].imageURL !== data.imageURL){
          dbStorage.refFromURL(fundObjects[currentId].imageURL).delete();
        }
        db.child(`fund-raise/${currentId}`).set(
          data,
          err =>{
            if(err){
              console.log(err);
            }
            else{
              setCurrentId('');
            }
          }
        )
      }
  }

  const onDelete = id => {
    if(window.confirm("Are you sure to delete the record?")){
     dbStorage.refFromURL(fundObjects[id].imageURL).delete();
     
      db.child(`fund-raise/${id}`).remove(
        err =>{
          if(err){
            console.log(err);
          }
          else{
            setCurrentId('');
          }
        }
      )
    }
  }


return(
  <>
<FrForm {...({ addOrEdit, currentId, fundObjects })}/>

<h2 className="text-center">Your Raise Funds</h2>
  <Container className="d-flex align-items-center  justify-content-center">
    
    <table className="table table-borderless table-stripped">
      <thead className="thead-light">
        <tr>
          <th>Title</th>
          <th>description</th>
          <th>Amount</th>
          <th>Easy Paisa Account</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          Object.keys(fundObjects).map( id =>{
            return id.email == currentUser.email ?
             <tr key={id}>
              <td>{fundObjects[id].title}</td>
              <td>{fundObjects[id].description}</td>
              <td>{fundObjects[id].amount}</td>
              <td>{fundObjects[id].easyPaisaAccount}</td>
              <td>
              <Button className="w-50 btn-dark" onClick={() => {setCurrentId(id)}}>Edit</Button>
              <Button className="w-50 btn-danger" onClick={() => {onDelete(id)}}>Delete</Button>
              </td>
            </tr>
            : ''
          })
        }
      </tbody>
    </table>
  </Container>

{/* <FrCases/> */}
</>
);
}
export default FundRaiser;