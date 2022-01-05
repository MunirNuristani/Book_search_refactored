import React,{ useState, useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'


function SearchBar({ booksToShow, setIsLoading, setErr, setNum }) {

    const [search, setSearch] = useState('')
    const [numOfItems, setNumOfItems] = useState(10)
    const [bookData, setBookData] = useState([])
    const reference = useRef();
    const value = useRef();
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        setSearch(reference.current?.value)
        navigate("/search")
        reference.current.value=''
    }

    const onChange = (e) => {
        e.preventDefault();
        setNumOfItems(value.current?.value)
    }

    useEffect(() => {

        search && (
            fetch('http://openlibrary.org/search.json?title=' + encodeURI(search))
                .then(setIsLoading(true))
                .then(resp => {
                    if (resp.status !== 200) {
                        console.log(resp.status)
                        throw Error('Could not reach the servers. Please try agian later. ')
                    } return resp.json()
                })
                .then(books => {
                    setBookData(books.docs)
                    setSearch("")
                })
                .catch(err => setErr(err.message)))
    }, [search, setErr, setIsLoading])

    useEffect(() => {
        booksToShow(bookData)
        setNum(numOfItems)
        setIsLoading(false)
    }, [bookData, numOfItems])

    return (
        <Form gap={3} onSubmit={onSubmit} className=" d-flex flex-column flex-wrap flex-grow m-5" >
            <Form.Group controlId="searchForm" className="w-75 m-auto ">
                <Form.Label className="h3">Search a Book: </Form.Label>
                <Form.Group className="d-flex flex-row ">
                    <Form.Control size="md" type="text" placeholder="Search for a  book..." ref={reference}
                    />
                    <Button variant="outline-primary" type="submit" className=" mx-2 p-2">
                        {" "} <Link to="/search" > <FaSearch /> </Link >{" "}
                    </Button>
                </Form.Group>
            </Form.Group>
            <Form.Group className="w-75 m-auto d-flex flex-row my-2 justify-content-between align-items-center">
                <Form.Label className="h6 my-auto ml-0"> Number of Books to Show per Page: </Form.Label>
                <Form.Select className="w-25 ml-0" area-label="Number of books per page:  " ref={value}
                    onChange={onChange}
                >
                    <option > 10 </option>
                    <option value='20'> 20 </option>
                    <option value='30'> 30 </option>
                </Form.Select>

            </Form.Group>
        </Form>
    );
}

export default SearchBar;
