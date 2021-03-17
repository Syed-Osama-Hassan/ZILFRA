import React, { useRef, useState } from "react";
import NavBar from '../NavBar/NavBar';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../../firebase';

const LoanForm = (props) => {
  
  
  const { currentUser } = useAuth();
  const [user, setUser] = useState(currentUser.email);
  const titleRef = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const accountRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();
  const [image, setImage] = useState(null);
  const [url, setURL] = useState('');

  // Initial loan form values
  const initialValues = {
    email: currentUser.email,
    title: '',
    description: '',
    easyPaisaAccount: '',
    imageURL: ''
  }
  const [values, setValues] = useState(initialValues);

  function handleDataChange(){
    
    if(titleRef.current.value !== ''){
      setValues({
        ...values,
        "title": titleRef.current.value
      });
    }
    if(descriptionRef.current.value !== ''){
      setValues({
        ...values,
        "description": descriptionRef.current.value
      });
    }
    if(accountRef.current.value !== ''){
      setValues({
        ...values,
        "easyPaisaAccount": accountRef.current.value
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
   

    // Code for upload picture
    const uploadImage = storage.ref(`loan/${image.name}`).put(image);
    uploadImage.on(
      "state_changed",
      snapshot => {},
      error =>{
        console.log(error)
      },
      () => {
        storage
        .ref('loan')
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          setURL(url);
          setValues({
            ...values,
            "imageURL": url
          });
          props.addOrEdit(values);
        });
      }
    )
    let x = document.getElementsByName('loan-form')[0];
    x.reset();
    setMessage('Submit Successful');
  }

  const handleChange = e =>{
    if(e.target.files[0]){
      setImage(e.target.files[0]);
    }
  };
  
  return (
    <>
      <NavBar />
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Loan Form</h2>
              {message && <Alert variant="success">{message}</Alert>}
              <Form name="loan-form" onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control plaintext readOnly defaultValue={user} />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Title</Form.Label>
                  <Form.Control onChange={handleDataChange} type="text" ref={titleRef} required></Form.Control>
                </Form.Group><br />
                <Form.Group id="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control onChange={handleDataChange} as="textarea" rows={5} ref={descriptionRef} required />
                </Form.Group>
                <br />
                <Form.Group id="tel">
                  <Form.Label>Easy Paisa Number</Form.Label>
                  <Form.Control onChange={handleDataChange} type="tel" ref={accountRef} required></Form.Control>
                </Form.Group><br />
                <Form.Group>
                  <Form.File id="image" onChange={handleChange} label="Upload picture relevant to loan" ref={imageRef} />
                </Form.Group><br />
                <Button disabled={loading} className="w-100 btn-dark" type="submit">Submit</Button>
              </Form>

            </Card.Body>
          </Card>
        </div>
      </Container>

    </>
  );
};
export default LoanForm;
