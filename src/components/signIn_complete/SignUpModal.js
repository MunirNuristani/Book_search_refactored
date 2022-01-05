import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth'
import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'
import { auth } from "../FBconfig/Firebase.config"



function SignupModal({ show, onHide }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [passwordAlert, setPasswordAlert] = useState(false)
  

  useEffect(() => {
    if (password1 !== password2) {
      setPasswordAlert(true)
    } else if (password1 === password2) {
      setPasswordAlert(false)
    }
  }, [password1, password2])

  const signUp = () => {
    if (password1 === password2) {
      createUserWithEmailAndPassword(auth, email, password1).then((userCredential) => {updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`
      })})
      .then(()=>{
        sendEmailVerification(auth.currentUser)
      })
    }
  }


  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size='lg'
      >
        <Modal.Header closeButton className='border-bottom-0'>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <>
          <div className="mx-4">
            <Form validated={firstName||lastName? true:false} onSubmit={()=>signUp()}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="validateUserName" >
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control type="text" 
                  placeholder="First Name" 
                  onChange={(e) => setFirstName(e.target.value)} 
                  minLength={3}
                  maxLength={15}
                  />
                  <Form.Control.Feedback type="invalid">
                    First name must be between 3 to 15 characters.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} controlId="validateUserLastName">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control 
                  type="text" 
                  placeholder="Last Name" 
                  onChange={(e) => setLastName(e.target.value)} 
                  minLength={3}
                  maxLength={15}
                  />
                  <Form.Control.Feedback type="invalid">
                    Last name must be between 3 to 15 characters.
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" controlId="formGridEmail">
                <Form.Label> Email Address</Form.Label>
                <Form.Control 
                type="email" 
                placeholder="name@example.com" 
                onChange={(e) => setEmail(e.target.value)} 
                />
                <Form.Control.Feedback type="invalid">
                    Please provide a valid Email
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="validatedPassword1">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  placeholder="Password" 
                  type='password' 
                  onChange={(e) => setPassword1(e.target.value)}
                  minLength={6} 
                  />
                  <Form.Control.Feedback type="invalid">
                    Password must be longer than 6 characters.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='validatePassword2'>
                <Form.Label>Re-enter Password</Form.Label >
                <Form.Control 
                  placeholder="Re-enter Password" 
                  type='password' 
                  onChange={(e) => setPassword2(e.target.value)}
                  minLength={6} />
                   <Form.Control.Feedback type="invalid">
                    Password must be longer than 6 characters.
                  </Form.Control.Feedback>
                <p style={passwordAlert ? { diplay: 'block', color: 'red' } : { display: 'none' }}>Password does not match.</p>
              </Form.Group >
            </Form>
          </div>
        </>
        <Modal.Footer className="d-flex justify-content-center border-top-0">
          <Button variant="primary" className="w-25" onClick={() => {
            onHide()
            signUp()
          }} >
            Sign Up
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignupModal
