import React,{ useState, useEffect } from 'react'
import Card from "react-bootstrap/Card"
import pic from "../Images/No_Image.jpg"
import ModalDetails from './ModalDetails'
import  BouncingBalls  from 'react-cssfx-loading/lib/BouncingBalls'

function Books({ book }) {
    const [image, setImage] = useState()
    const [show, setShow] = useState(false)
    const [loadingPic, setLoadingPic] = useState(false)

    useEffect(function () {
        setLoadingPic(true)
        fetch(`https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`)
            .then((data) => {
                if ((data.url).includes("undefined")) {
                    setImage(pic)
                    setLoadingPic(false)
                }
                else {
                    setImage(data.url)
                    setLoadingPic(false)
                }
            })
    }, [book])


    return ( 
        
            <>
            <Card style={{ width: "320px", alignItems: "center" }} className="text-center m-4 p-4 rounded" onClick={() => setShow(true)} >
                <Card.Img variant="top" src={loadingPic?<BouncingBalls />:image} alt="Book Cover" style={{ width: "200px", height: "300px" }} className="m-2" />
                <Card.Title> {book.title} </Card.Title>
                <Card.Text className="m-0"> Author: {book.author_name}</Card.Text>
            </Card>
            <ModalDetails show={show} onHide={() => setShow(false)} book={book} image={image} />
            </>

    )
}

export default Books;