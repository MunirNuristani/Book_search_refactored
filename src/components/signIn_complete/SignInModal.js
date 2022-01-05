import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import SignupModal from './SignUpModal'
import ForgotPasswordModal from './ForgotPasswordModal'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { auth } from "../FBconfig/Firebase.config"
import {ReactComponent as FBLogin } from '../../Images/facebook_icon-icons.com_59205.svg'
import {ReactComponent as GoogleLogin} from '../../Images/google_icon-icons.com_62736.svg'


function SignInModal({ show, onHide, setUser, setLoggedIn }) {

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [showSignup, setShowSignup] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false)
  const openSignup = () => setShowSignup(true);
  const closeSignup = () => setShowSignup(false);
  const openPasswordReset = () => setShowPasswordReset(true)
  const closePasswordReset = () => setShowPasswordReset(false)
  
  

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, userEmail, userPassword);
      setUser(user.user.auth.dispalyName)
      console.log(user.user)
      setLoggedIn(true)
      onHide()
      setErrorMessage('')
    } catch (error) {
      const errMsg = error.message
      if ((errMsg).includes('invalid-email')) {
        setErrorMessage("Invalid Email, Please provide email in 'example@domin.com' format")
      } else if ((errMsg).includes('user-not-found')) {
        setErrorMessage("User does not exist. Please sign up.")
      } else if ((errMsg).includes('wrong-password')) {
        setErrorMessage("The password you proivded does not match our records. Please check your password or click on 'Forgot password'.")
      }
    }
  }

  const googleLogin = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then(() => {
        onHide()
        setErrorMessage('')
      }).catch((error) => {
         console.log(error.code)
        
      });
  }
  const facebookLogin = () =>{
    const provider = new FacebookAuthProvider()
    signInWithPopup(auth, provider)
    .then(() => {
      onHide()
      setErrorMessage('')
    })
    .catch((error) => {
      console.log( error.code)
    });
  }
  useEffect(() => {
   setErrorMessage('')
    }, [userEmail, userPassword])

  return (

    <>
      <Modal
        show={show}
        onHide={onHide}
      >
        <Modal.Header closeButton className="border-bottom-0">
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <div>
          <Form  validated={userEmail||userPassword? true:false} className='px-3 mx-3' onSubmit={()=>{
            login()}}>
            <Form.Group className="mb-3" controlId="validateUserEmail">
              <Form.Label className='d-flex align-item-center justify-content-between'>Email address <><small style={{ justifyContent: 'flex-start' }}>Need an account?
                <span style={{ cursor: 'pointer', color: 'blue' }} className="w-100" onClick={() => {
                  openSignup()
                  onHide()}}> Sign up </span></small></></Form.Label>
              <Form.Control type="email" placeholder="name@example.com" onChange={(e) => {
                setUserEmail(e.target.value)
                setErrorMessage('')
              }} required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                onChange={(e) => {
                setUserPassword(e.target.value)
                setErrorMessage('')}} 
                required
                minLength={6}
                />
                <Form.Control.Feedback type="invalid">
                Passwords must be at least six letters long.
              </Form.Control.Feedback>
                </Form.Group>
              <small style={errorMessage ? { display: 'block', color: 'red' } : { display: 'none' }}>{errorMessage}</small>
              <small className=""><u onClick={() => {
                openPasswordReset()
                onHide()}}
                style={{ cursor: "pointer", color: 'blue' }}>Forgot password</u></small>
            
            <div className='d-flex w-100 justify-content-center mt-3'>
              <Button variant="primary" className="w-50" onClick={() => {
                if (userEmail === "" || userPassword === "") {
                  //do nothing
                } else if (errorMessage !== '') {
                  //do nothing
                }
                else {
                  setUserEmail('')
                  setUserPassword('')
                  login()
                }}} >
                Sign In
              </Button>
            </div>
            <Form.Group>
              <div className="d-flex flex-column justify-content-center">
              <hr/>
                <p className="m-auto text-center py-3"> Or Login with: </p>
                <div className="d-flex flex-row justify-content-center py-2">
                  <GoogleLogin style={{ marginRight: '5px',cursor:'pointer', width:'3rem' }}  onClick={googleLogin} />
                  <FBLogin style={{ marginLeft: '5px', cursor:'pointer', width:'3rem'}}  onClick={facebookLogin} />
                </div>
              </div>
            </Form.Group>
          </Form>
        </div>
        <Modal.Footer className="border-top-0">
        </Modal.Footer>
      </Modal>
      <SignupModal show={showSignup} onHide={closeSignup} />
      <ForgotPasswordModal show={showPasswordReset} onHide={closePasswordReset} />
    </>
  );
}

export default SignInModal
