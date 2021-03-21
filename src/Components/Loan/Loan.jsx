import React, { useState, useEffect } from "react";
import LoanForm from "./LoanForm";
import LoanCases from "./LoanCases";
import firebase from '../../firebase';
import { Container, Button } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext';

const db = firebase.database().ref();
const dbStorage = firebase.storage();

const Loan = () => {
  const [loanObjects, setLoanObjects] = useState({});
  const [currentId, setCurrentId] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    db.child('loan').on('value', snapshot => {
      if (snapshot.val() !== null) {
        setLoanObjects({
          ...snapshot.val()
        })
      }
      else {
        setLoanObjects({});
      }
    })
  }, [])

  // Adding to database
  const addOrEdit = (obj, url) => {
    var data = { ...obj, imageURL: url };
    if (currentId == '') {
      db.child('loan').push(
        data,
        err => {
          if (err) {
            console.log(err);
          }
          else {
            setCurrentId('');
          }
        }
      )
    }
    // Edit data
    else {
      // Delete old photo
      if (loanObjects[currentId].imageURL !== data.imageURL) {
        dbStorage.refFromURL(loanObjects[currentId].imageURL).delete();
      }
      db.child(`loan/${currentId}`).set(
        data,
        err => {
          if (err) {
            console.log(err);
          }
          else {
            setCurrentId('');
          }
        }
      )
    }
  }

  const onDelete = id => {
    if (window.confirm("Are you sure to delete the record?")) {
      dbStorage.refFromURL(loanObjects[id].imageURL).delete();

      db.child(`loan/${id}`).remove(
        err => {
          if (err) {
            console.log(err);
          }
          else {
            setCurrentId('');
          }
        }
      )
    }
  }

  return (
    <>
      <LoanForm {...({ addOrEdit, currentId, loanObjects })} /><hr />
      <h2 className="text-center">Your Loans</h2>
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
              Object.keys(loanObjects).map(id => {
                return id.email == currentUser.email ?
                  <tr key={id}>
                    <td>{loanObjects[id].title}</td>
                    <td>{loanObjects[id].description}</td>
                    <td>{loanObjects[id].amount}</td>
                    <td>{loanObjects[id].easyPaisaAccount}</td>
                    <td>
                      <Button className="w-50 btn-dark" onClick={() => { setCurrentId(id) }}>Edit</Button>
                      <Button className="w-50 btn-danger" onClick={() => { onDelete(id) }}>Delete</Button>
                    </td>
                  </tr>
                  : ''
              })
            }
          </tbody>
        </table>
      </Container>
      {/* <LoanCases/> */}
    </>
  );
}
export default Loan;