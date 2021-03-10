import React, { useRef, useState } from 'react'
import {Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

export default  function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/Home")
        }catch(e){
            setError(e.message)
        }
        setLoading(false)
    }

    return (
        <Container  className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh"}}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
         <Card>
             <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                {error && <Alert variant="danger">{ error }</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required></Form.Control>
                    </Form.Group><br/>
                    <Button disabled={loading} className="w-100 btn-dark" type="submit">Log In</Button>
                </Form>
             </Card.Body>
         </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
        </div>   
        </div>
        </Container>
    )
}
