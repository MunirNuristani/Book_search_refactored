import React,{ useState, useEffect } from 'react'
import Card from "react-bootstrap/Card"
import MainPageModal from './MainPageModal'

// TODO: books for list of books, if just 1 book, then "book"
function MainPageBooks({ title, image, contributor, rank, book }) {
    const [show, setShow] = useState(false)
    const [bookToShow, setBookToShow] = useState([])
    const showModal = () => setShow(true)
    const hideModal = () => setShow(false)
    useEffect(() => {
        setBookToShow(book)
    }, [book])

    // TODO: card should show pointer, and hover affects like darken background
    return (

        <>
            <Card style={{ width: "320px", alignItems: "center" }} className="text-center m-4 p-4 rounded" onClick={showModal} >
                <Card.Text className="mb-2"> This Week's Ranking: {rank} </Card.Text>
                <Card.Img variant="top" src={image} alt="Book Cover" style={{ width: "200px", height: "300px" }} className="m-2" />
                <Card.Title> {title} </Card.Title>
                <Card.Text className="m-0"> {contributor}</Card.Text>
            </Card>
            <>
                <MainPageModal show={show} onHide={hideModal} book={bookToShow} />
            </>
        </>

    )
}
export default MainPageBooks
