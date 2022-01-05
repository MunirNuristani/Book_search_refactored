import React from "react";
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


function ModalDetails(props) {
  const amazonUrl = 'https://www.amazon.com/s?k='
  const bandNUrl ='https://www.barnesandnoble.com/s/'
  const thriftUrl = 'https://www.thriftbooks.com/browse/?b.search='
  const genre = arr => {
    if (arr) {
      let newArr = [];
      for (let el in arr) {
        newArr.push(arr[el].toLowerCase());
      }
      if (newArr.includes("fiction")) {
        return "Fiction";
      } else if (
        newArr.includes("non-fiction") ||
        newArr.includes("nonfiction")
      ) {
        return "Non-Fiction";
      } else {
        return arr[0];
      }
    }
  };
    const findBook = (url,book) => {
      const link = window.open(url+encodeURI(book),'_blank', 'noopener,noreferrer')
      return link
      
    }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" size="lg">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.book.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container className="d-flex flex-row justify-content-center">
          <Col className="p-1 m-1">
            <Row className="h5">General Information:</Row>
            <Row>
              <Col>Author:</Col>
              <Col>
                {" "}{props.book.author_name}
              </Col>
            </Row>
            <Row>
              <Col>First Published:</Col>
              <Col>
                {" "}{props.book.first_publish_year}
              </Col>
            </Row>
            <Row>
              <Col>Genre:</Col>
              <Col>
                {props.book.subject
                  ? genre(props.book.subject)
                  : genre(props.book.subject_fauct)}
              </Col>
            </Row>
            <Row>
              <Col>Publisher:</Col>
              <Col>
                {props.book.publisher?(props.book.publisher[0]):'' }
              </Col>
            </Row>
            <Row style={{ marginTop: "100px" }}>
              <Col>
                {" "}<p>Find it on: </p>
                
                <Image
                  style={{ height: "25px", paddingLeft: "5px", cursor:'pointer' }}
                  src={Amazon}
                  onClick={()=>findBook(amazonUrl, props.book.title)}
                />
                <Image
                  style={{ height: "15px", paddingLeft: "20px", cursor:'pointer' }}
                  src={BandN}
                  onClick={()=>findBook(bandNUrl, props.book.title)}
                />
                <Image
                  style={{ height: "25px", paddingLeft: "20px", cursor:'pointer' }}
                  src={Thrift}
                  onClick={()=>findBook(thriftUrl, props.book.title)}
                />
              </Col>
            </Row>
          </Col>
          <Col className="p-1 m-auto text-center">
            <Image
              src={props.image}
              alt={props.book.title}
              style={{ width: "200px", height: "300px" }}
            />
          </Col>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default ModalDetails;
