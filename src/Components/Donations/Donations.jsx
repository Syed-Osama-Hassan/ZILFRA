import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar';
import { useAuth } from '../contexts/AuthContext';
import firebase from '../../firebase';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { storage } from '../../firebase';
import { useParams, useRouteMatch } from 'react-router';

const db = firebase.database().ref();
const dbStorage = firebase.storage();

const Donations = () => {
    const { id } = useParams();
    let { path } = useRouteMatch();
    const getCardType = path.slice(1, path.length - 13);
    const { currentUser } = useAuth();
    const [message, setMessage] = useState('');
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);
    const [donationObjects, setDonation] = useState({});
    const [currentId, setCurrentId] = useState('');

    const initialValues = {
        email: currentUser.email,
        amount: '',
        imageURL: '',
        id: id,
        type: getCardType
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

      // Adding to database
  const addOrEdit = (obj, url) => {
    var data = { ...obj, imageURL: url, id: id, type: getCardType };
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
    // Edit data
   // else {
      // Delete old photo
    //   if (donationObjects[currentId].imageURL !== data.imageURL) {
    //     dbStorage.refFromURL(donationObjects[currentId].imageURL).delete();
    //   }
    //   db.child(`donation/${currentId}`).set(
    //     data,
    //     err => {
    //       if (err) {
    //         console.log(err);
    //       }
    //       else {
    //         setCurrentId('');
    //       }
    //     }
    //   )
    // }
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
        if (e.target.files[0]) {
          setImage(e.target.files[0]);
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
              {message && <Alert variant="success">{message}</Alert>}
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
                  <Form.File id="image" onChange={handleChange} label="Upload screenshot of easypaisa after donating" required/>
                </Form.Group><br />
                <Button disabled={loading} className="w-100 btn-dark" type="submit">Donate</Button>
              </Form>

            </Card.Body>
          </Card>
        </div>
      </Container>


           
        </>
    );
}

export default Donations;