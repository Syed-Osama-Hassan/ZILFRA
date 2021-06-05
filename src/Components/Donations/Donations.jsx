import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar';
import { useAuth } from '../contexts/AuthContext';
import firebase from '../../firebase';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { storage } from '../../firebase';
import { Router, useParams, useRouteMatch } from 'react-router';

const db = firebase.database().ref();
const dbStorage = firebase.storage();

const Donations = () => {
    const { id, email } = useParams();
    let { path } = useRouteMatch();
    const getCardType = path.slice(1, 5);
    const { currentUser } = useAuth();
    const [message, setMessage] = useState('');
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);
    const [donationObjects, setDonation] = useState({});
    const [currentId, setCurrentId] = useState('');
    const [data, setData] = useState({});
    const [invalidImg, setInvalidImg] = useState(false);

    const initialValues = {
        email: currentUser.email,
        amount: '',
        imageURL: '',
        id: id,
        type: getCardType,
        receiverEmail: email
      }
      const [values, setValues] = useState(initialValues);


      useEffect(() => {
        db.child('donation').on('value', snapshot => {
          if (snapshot.val() != null) {
            setDonation({
              ...snapshot.val()
            })
          }
          else {
            setDonation({});
          }
        })
      }, [])


      useEffect(() => {
        if(getCardType === "loan"){
            db.child('loan').on('value', snapshot => {
                if (snapshot.val() != null) {
                    setData({
                    ...snapshot.val()
                  })
                }
                else {
                    setData({});
                }
              })
        }  
        else{
            db.child('fund-raise').on('value', snapshot => {
                if (snapshot.val() != null) {
                  setData({
                    ...snapshot.val()
                  })
                }
                else {
                    setData({});
                }
              })
        }
       
      }, [])

      // Adding to database
  const addOrEdit = (obj, url) => {
    var data = { ...obj, imageURL: url, id: id, type: getCardType, receiverEmail: email };
    if (currentId == '') {
      db.child('donation').push(
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
      const handleDataChange = e => {
        const name = e.target.name;
        const value = e.target.value;
         
        setValues({
          ...values,
          [name]: value
        })
        setMessage('');
      }

    function handleSubmit(e) {
        e.preventDefault();

        // Code for upload picture
    const uploadImage = storage.ref(`donation/${image.name}`).put(image);
    uploadImage.on(
      "state_changed",
      (snapshot) => { },
      (error) => {
        console.log(error)
      },
      () => {
        storage
          .ref('donation')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            addOrEdit(values, url);
          }
          )

      }
    )
    Promise.resolve(uploadImage).then(
      () => {
        setMessage('Donation Successful');
        document.getElementsByName('donation')[0].reset();
      }
    )
    
    }

    const handleChange = e => {
     
      var fileName = document.getElementById("image").value;
      var idxDot = fileName.lastIndexOf(".") + 1;

      var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
      
      if(e.target.files[0]){
      if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
          setInvalidImg(false);
          setImage(e.target.files[0]);
          setMessage("")
      }else{
        setInvalidImg(true);
        setMessage("Please select a valid image with .jpg, .jpeg, or .png extension") 
      }

    }
  };

    return (
        <>
            <NavBar />
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Donation Form</h2>
              {message && <Alert variant={invalidImg === false? 'success' : "danger"}>{message}</Alert>}
              <Form name="donation" onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control plaintext readOnly defaultValue={currentUser.email} />
                </Form.Group>
                
                <Form.Group id="amount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control name="amount" value={values.amount} onChange={handleDataChange} type="number" min="500" max="10000" required></Form.Control>
                </Form.Group><br />
                <Form.Group>
                  <Form.File id="image" onInput={handleChange} accept=".png, .jpeg, .jpg" label="Upload screenshot of easypaisa after donating" required/>
                </Form.Group><br/>
                <Button disabled={loading, invalidImg} className="w-100 btn-dark" type="submit">Donate</Button>
                
              </Form>

            </Card.Body>
          </Card>
        </div>
      </Container>


           
        </>
    );
}

export default Donations;