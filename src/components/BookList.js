import React from 'react'
import Books from './Book';
import Container from 'react-bootstrap/Container'



const BookList = ({ showBooks }) => {
    
    return (
        <Container fluid="lg" className="d-flex flex-row flex-wrap align-item-center p-0 justify-content-center" >
            {showBooks?(showBooks.map((book) =>
                <Books key={book.cover_i} book={book} />
            )):''}
        </Container>
    )
}

export default BookList;
 