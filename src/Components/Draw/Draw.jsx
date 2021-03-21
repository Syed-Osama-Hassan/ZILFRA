import React, { useState, useEffect } from "react";
import DCases from "./DCases";
import DForm from "./DForm";
import firebase from '../../firebase';
import { Container, Button } from "react-bootstrap";
import { useAuth } from '../contexts/AuthContext';

const db = firebase.database().ref();
const dbStorage = firebase.storage();

const Draw = () => {
  const [drawObjects, setDrawObjects] = useState({});
  const [currentId, setCurrentId] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    db.child('draw').on('value', snapshot => {
      if (snapshot.val() !== null) {
        setDrawObjects({
          ...snapshot.val()
        })
      }
      else {
        setDrawObjects({});
      }
    })
  }, [])

  // Adding to database
  const addOrEdit = (obj, url) => {
    var data = { ...obj, imageURL: url };

    if (currentId == '') {
      db.child('draw').push(
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
      if (drawObjects[currentId].imageURL !== data.imageURL) {
        dbStorage.refFromURL(drawObjects[currentId].imageURL).delete();
      }
      db.child(`draw/${currentId}`).set(
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
      dbStorage.refFromURL(drawObjects[id].imageURL).delete();

      db.child(`draw/${id}`).remove(
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
      <DForm {...({ addOrEdit, currentId, drawObjects })} />
      <h2 className="text-center">Your Draws</h2>
      <Container className="d-flex align-items-center  justify-content-center">

        <table className="table table-borderless table-stripped">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>description</th>
              <th>Amount</th>
              <th>Duration</th>
              <th>Easy Paisa Account</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(drawObjects).map(id => {
                return id.email == currentUser.email ?
                  <tr key={id}>
                    <td>{drawObjects[id].title}</td>
                    <td>{drawObjects[id].description}</td>
                    <td>{drawObjects[id].amount}</td>
                    <td>{drawObjects[id].duration}</td>
                    <td>{drawObjects[id].easyPaisaAccount}</td>
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
      {/* <DCases/> */}
    </>
  );
}
export default Draw;