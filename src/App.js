import React, { useState } from "react";
import Pages from "./components/Pages";
import SearchBar from "./components/SearchBar";
import Ring from "react-cssfx-loading/lib/Ring";
import Nav from "./components/Nav";
import ReadingList from "./components/readingList";
import "./App.css";
import MainPage from "./components/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  const [listOfBooksToShow, setListOfBooksToShow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [num, setNum] = useState(0);
  const [err, setErr] = useState("");

  return (
    <Router>
      <Nav />
      <SearchBar
        booksToShow={setListOfBooksToShow}
        setIsLoading={setIsLoading}
        setErr={setErr}
        setNum={setNum}
      />
      <ReadingList />
      <Routes>
        <Route path="/" caseSensitive element={<MainPage />} />
        <Route
          path="/search"
          caseSensitive={false}
          element={
            isLoading
              ? <Ring
                  className="d-flex justify-content-center align-text-center"
                  style={{
                    margin: "auto",
                    fontSize: "30px",
                    marginTop: "150px",
                    marginBotton: "5rem"
                  }}
                />
              : err
                ? <p>err</p>
                : <Pages bookList={listOfBooksToShow} num={num} />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
