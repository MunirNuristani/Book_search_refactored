import React,{ useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import { Image } from "react-bootstrap";
import Amazon from "../Images/amazon_logo.png";
import BandN from "../Images/BandN_logo.png";
import Thrift from "../Images/ThriftBooks_logo.png";


function MainPageModal({show, onHide, book}) {
  const amazonUrl = 'https://www.amazon.com/s?k='
  const bandNUrl ='https://www.barnesandnoble.com/s/'
  const thriftUrl = 'https://www.thriftbooks.com/browse/?b.search='
  const [ bookInfo, setBookInfo ] = useState([]) 
  
    const findBook = (url,bookName) => {
      const link = window.open(url+encodeURI(bookName),'_blank', 'noopener,noreferrer')
      return link
    }
    useEffect(() => {
      setBookInfo(book)
  }, [book])

  return (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter" size="xl">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {bookInfo.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container className="d-flex flex-row justify-content-center">
          <Col className="p-1 m-1">
            <Row className="h5">General Information:</Row>
            <Row>
              <Col>Author:</Col>
              <Col>
                {" "}{bookInfo.author}
              </Col>
            </Row>
            <Row>
              <Col>Ranking This Week:</Col>
              <Col>
                {" "}{bookInfo.rank}
              </Col>
            </Row>
            <Row>
              <Col>Ranking last Week:</Col>
              <Col>
                {" "}{bookInfo.rank_last_week}
              </Col>
            </Row>
            <Row>
              <Col>Weeks on the List</Col>
              <Col>
                {" "}{bookInfo.weeks_on_list}
              </Col>
            </Row>
            <Row>
              <Col>Publisher:</Col>
              <Col>
                {" "} {bookInfo.publisher}
              </Col>
            </Row>
            <Row>
              <Col>Description: </Col>
              <Col>
                {" "}{bookInfo.description}
              </Col>
            </Row>
            <Row style={{ marginTop: "100px" }}>
              <Col>
                {" "}<p>Find it on: </p>
                
                <Image
                  style={{ height: "25px", paddingLeft: "5px", cursor:'pointer' }}
                  src={Amazon}
                  onClick={()=>findBook(amazonUrl, bookInfo.title)}
                />
                <Image
                  style={{ height: "15px", paddingLeft: "20px", cursor:'pointer'}}
                  src={BandN}
                  onClick={()=>findBook(bandNUrl, bookInfo.title)}
                />
                <Image
                  style={{ height: "25px", paddingLeft: "20px", cursor:'pointer'}}
                  src={Thrift}
                  onClick={()=>findBook(thriftUrl, bookInfo.title)}
                />
              </Col>
            </Row>
          </Col>
          <Col className="p-1 m-auto text-center">
            <Image
              src={bookInfo.book_image}
              alt={bookInfo.title + 'book'}
              style={{ width: "300px", height: "400px" }}
            />
          </Col>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MainPageModal;