import React, { useRef, useState, useEffect } from "react";
import NavBar from '../NavBar/NavBar';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../../firebase';

const LoanForm = (props) => {


  const { currentUser } = useAuth();
  const [user, setUser] = useState(currentUser.email);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState();
  const titleRef = useRef();
  const [invalidImg, setInvalidImg] = useState(false);

  // Initial loan form values
  const initialValues = {
    email: currentUser.email,
    title: '',
    description: '',
    amount: '',
    easyPaisaAccount: '',
    imageURL: ''
  }
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if(props.currentId == ''){
      setValues({
        ...initialValues
      })
    }
    else{
      setValues({
        ...props.loanObjects[props.currentId]
      })
    }
    titleRef.current.focus();
  }, [props.currentId, props.loanObjects])

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
    const uploadImage = storage.ref(`loan/${image.name}`).put(image);
    uploadImage.on(
      "state_changed",
      (snapshot) => { },
      (error) => {
        console.log(error)
      },
      () => {
        storage
          .ref('loan')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            props.addOrEdit(values, url);
          }
          )

      }
    )
    Promise.resolve(uploadImage).then(
      () => {
        setMessage('Submit Successful');
        document.getElementsByName('loan-form')[0].reset();
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
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Loan Form</h2>
              {message && <Alert variant={invalidImg === false? 'success' : "danger"}>{message}</Alert>}
              <Form name="loan-form" onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control plaintext readOnly defaultValue={user} />
                </Form.Group>
                <Form.Group id="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control onChange={handleDataChange} name="title" value={values.title} ref={titleRef} type="text" required></Form.Control>
                </Form.Group><br />
                <Form.Group id="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control name="description" value={values.description} onChange={handleDataChange} as="textarea" rows={5} required />
                </Form.Group>
                <br />
                <Form.Group id="amount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control name="amount" value={values.amount} onChange={handleDataChange} type="number" min="500" max="50000" required></Form.Control>
                </Form.Group><br />
                <Form.Group id="tel">
                  <Form.Label>Easy Paisa Number</Form.Label>
                  <Form.Control name="easyPaisaAccount" value={values.easyPaisaAccount} onChange={handleDataChange} type="tel" required></Form.Control>
                </Form.Group><br />
                <Form.Group>
                  <Form.File id="image" onChange={handleChange} label="Upload picture relevant to loan" accept=".png, .jpeg, .jpg" required/>
                </Form.Group><br />
                <Button disabled={loading, invalidImg} className="w-100 btn-dark" type="submit">{props.currentId == ''? "Submit" : "Update"}</Button>
              </Form>

            </Card.Body>
          </Card>
        </div>
      </Container>

    </>
  );
};
export default LoanForm;
