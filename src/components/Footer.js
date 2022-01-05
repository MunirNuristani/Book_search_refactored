import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { FaHeart , FaFacebookF, FaTwitter, FaInstagramSquare, FaGithub } from 'react-icons/fa';


function Footer() {
    return (
        <footer className='page-footer'>
        <Navbar  className='w-100 p-0 ' style={{ backgroundColor: '#061626', position:'absolute', bottom:'0', height:'80px' }} variant="dark" >
            <Container className="d-flex flex-column m-0 p-0" style={{maxWidth:'100vw'}}>
                <Navbar.Brand>
                    <FaFacebookF className='mx-2' />
                    <FaTwitter className='mx-2'/>
                    <FaInstagramSquare className='mx-2'/>
                    <FaGithub className='mx-2'/>
                </Navbar.Brand >
                <Navbar.Brand className='m-0 p-0'>
                    <small className="text-muted " style={{fontSize:'0.75rem'}}>
                    © 2021 Made with <FaHeart style={{ color: 'red' }} /> by
                        <span> Munir Nuristani</span>
                    </small>
                </Navbar.Brand>
            </Container>
        </Navbar>
        </footer>
    )
}

export default Footer
