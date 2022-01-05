import React,{ useState, useEffect } from 'react'
import { Container, Navbar, Button } from 'react-bootstrap';
import logo from '../Images/book_logo.png';
import SignInModal from './signIn_complete/SignInModal';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { auth } from './FBconfig/Firebase.config'
import { onAuthStateChanged } from 'firebase/auth'
import SignoutModal from './signIn_complete/SignoutModal';

function Nav() {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [SignOutModal, setSignOutModal ] = useState('')
    const [user, setUser] = useState("Guest");
    const handleClose = () => setShowLoginModal(false);
    const handleShow = () => setShowLoginModal(true);
    const showSignOutModal = () => setSignOutModal(true)
    const hideSignOutModal = () => setSignOutModal(false)
    const [loggedIn, setLoggedIn] = useState(false);

    onAuthStateChanged(auth, (currentUser)=>{
       currentUser? setUser(currentUser.displayName):setUser("Guest")
    })

   useEffect(()=>{
       if(user!=="Guest"){
           setLoggedIn(true)
       }
   },[user])

    return (
        <div>
            <Navbar style={{ backgroundColor: '#061626', }} variant="dark">
                <Container className="d-flex justify-content-between mx-4" style={{maxWidth:'100vw'}}>
                    <Navbar.Brand  className="d-flex flex-row jusify-content-center algin-item-center mx-2 "  >
                        <img
                            alt="Book logo"
                            src={logo}
                            width="90"
                            height="50"
                            className=" align-top"
                        />{' '}
                        <div className='ml-0 d-flex align-item-center'>
                        <span style={{ color: '#fff', paddingLeft: '20px', cursor:'pointer', fontSize:'2rem'}} ><Link to="/"> <AiOutlineHome /> </Link> </span>
                    </div>
                    </Navbar.Brand>
                    
                    
                    <div className='d-flex flex-row align-items-center'>
                        <div style={{ color: '#fff', paddingRight: '20px' }}>Hi, {user?.split(" ")[0]} !</div>
                       
                        {loggedIn?<Button onClick={showSignOutModal}>Sign Out</Button>: <Button onClick={handleShow}>
                            Sign In</Button>}
                    </div>
                </Container>
            </Navbar>
            
            <SignInModal show={showLoginModal} onHide={handleClose} setUser={setUser} setLoggedIn={setLoggedIn} />
            <SignoutModal show={SignOutModal} onHide ={hideSignOutModal} setLoggedIn={setLoggedIn} />
            
        </div>
    )
}

export default Nav
