/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../API";

// Dummy data for initial render
const dummyBooks = [
  { id: 1, title: "Dummy Book 1", author: "Author A" },
  { id: 2, title: "Dummy Book 2", author: "Author B" },
];

function Books() {
  const [books, setBooks] = useState(dummyBooks);
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

  // Handling clicking on book for single view details.
  const handleClick = async (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <div>
      <h2>Books Page</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id} onClick={() => handleClick(book.id)}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
