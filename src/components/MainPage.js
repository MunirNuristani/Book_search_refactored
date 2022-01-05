import React,{ useState, useEffect } from "react";
import MainPageBooks from "./MainPageBooks";
import { Container, Image } from "react-bootstrap";
import NYT from "../Images/NYT_logo.png";
import { Link } from "react-router-dom";


function MainPage({ show }) {
  const [NYTBookList, setNYTBookList] = useState([]);

  useEffect(() => {
    
    fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.REACT_APP_NYTD_BOOK_API_KEY}`
    )
      .then(resp => resp.json())
      .then(data => {
        // TODO: Safeguard --> Cannot read properties of undefined
        setNYTBookList(data.results.books.slice(0, 10));
      });
  }, []);

  return (
    <div style={{ paddingBottom: "7rem" }}>
      <Link to={"/home"} />

      <Container className="d-flex flex-column">
        <div className="d-flex flex-column flex-wrap">
          <Image src={NYT} className="w-50 m-auto justify-content-center" />
          <h3 className="m-auto justify-content-center mt-4">
            This Week's Top 10 Reading List
          </h3>
        </div>
        <div className="d-flex flex-row flex-wrap align-item-center justify-content-center">
          {NYTBookList.map(book =>
            <MainPageBooks
              key={book.primary_isbn10}
              image={book.book_image}
              title={book.title}
              contributor={book.contributor}
              rank={book.rank}
              book={book}
            />
          )}
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
