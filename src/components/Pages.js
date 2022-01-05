import React,{ useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import BookList from './BookList';
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';


function Pages ( { ...props } ) {

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + parseInt(props.num);
        setCurrentItems(props.bookList ? (props.bookList.slice(itemOffset, endOffset)) : "");
        setPageCount(Math.ceil(props.bookList.length / props.num));
    }, [itemOffset, props.num]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * props.num) % props.bookList.length;
        setItemOffset(newOffset);
    };

    return (
        <>
            <BookList showBooks={currentItems} />
            <div className="d-flex justify-content-center" style={{paddingBottom:'7rem'}}>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<>Next < MdSkipNext style={{ fontSize: '20px' }} /></>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel={<>< MdSkipPrevious style={{ fontSize: '20px' }} /> Previous</>}
                renderOnZeroPageCount={null}
                activeClassName="active"
                marginPagesDisplayed={2}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                
            />
        </div >
        </>
    );
}
export default Pages
