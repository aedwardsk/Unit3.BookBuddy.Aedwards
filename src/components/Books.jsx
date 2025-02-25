/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../API";
import fallbackImage from "../assets/books.png";

// Dummy data for initial render
// const dummyBooks = [
//   { id: 1, title: "Dummy Book 1", author: "Author A" },
//   { id: 2, title: "Dummy Book 2", author: "Author B" },
// ];

function Books({ searchQuery }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const fetchedBooks = await fetchBooks();
        console.log("Fetch books", fetchedBooks);
        if (fetchedBooks && fetchedBooks.length > 0) setBooks(fetchedBooks);
      } catch (error) {
        console.error("Getting books error on fetch", error);
      }
    };
    getBooks();
  }, []);

  // Handling search functionality

  useEffect(() => {
    if (!searchQuery) {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase())));
    }
  }, [searchQuery, books]);

  // Handling clicking on book for single view details.
  const handleClick = async (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div>
      <h1 className='books-heading'>Books</h1>
      <div className='books-container'>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className='book-card'>
              <h4>{book.title}</h4>
              <img
                src={book.coverimage || fallbackImage}
                alt={`Image of ${book.title}`}
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
              />
              <p>by {book.author}</p>
              <p>{book.available ? "Available" : "Not Available"}</p>
              <button type='button' onClick={() => handleClick(book.id)}>
                See Book Details
              </button>
            </div>
          ))
        ) : (
          <p>Loading books...</p>
        )}
      </div>
    </div>
  );
}

export default Books;
