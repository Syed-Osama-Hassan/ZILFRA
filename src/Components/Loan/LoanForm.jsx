import React, { useEffect, useRef, useState } from "react";
import NavBar from '../NavBar/NavBar';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const LoanForm = (props) => {
  // Initial loan form values
  const initialValues = {
    email: '',
    title: '',
    description: '',
    easyPaisaAccount: ''
  }

  const [values, setValues] = useState(initialValues);
  const { currentUser } = useAuth();
  const [user, setUser] = useState(currentUser.email);
  const titleRef = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const accountRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    titleRef.current.focus();
  }), [];

  function handleSubmit(e) {
    e.preventDefault();

    // Setting values
    setValues({
      "email": currentUser.email,
      "title": titleRef.current.value,
      "description": descriptionRef.current.value,
      "easyPaisaAccount": accountRef.current.value
    });
    
    props.addOrEdit(values);
    setMessage('Submit Successful');
  }

  return (
    <>
      <NavBar />
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Loan Form</h2>
              {message && <Alert variant="success">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control plaintext readOnly defaultValue={user} />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" ref={titleRef} required></Form.Control>
                </Form.Group><br />
                <Form.Group id="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={5} ref={descriptionRef} required/>
                </Form.Group>
                <br/>
                <Form.Group id="tel">
                  <Form.Label>Easy Paisa Number</Form.Label>
                  <Form.Control type="tel" ref={accountRef} required></Form.Control>
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
