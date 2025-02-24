/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBook } from "../API";
import fallbackImage from "../assets/books.png";

function SingleBook() {
  const { id } = useParams();
  const [book, setbook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    //check for valid ID
    if (!id) return;

    const getBook = async () => {
      try {
        const bookData = await fetchBook(id);
        console.log("Fetched player:", bookData);
        setbook(bookData);
      } catch (error) {
        console.error("failed to get book from Database", error);
      }
    };
    getBook();
  }, [id]);
  return (
    <div>
      <h1>Single Book</h1>
      <div className='single-book-container'>
        {book ? (
          <div key={book.id} className='single-book-card'>
            <h4>{book.title}</h4>
            <img
              src={book.coverimage || fallbackImage}
              alt={`Image of ${book.title}`}
              onError={(e) => {
                e.target.src = fallbackImage;
              }}
            />
            <p>by: {book.author}</p>
            <p>Book ID: {book.id}</p>
            <p>{book.available ? "Available" : "Not Available"}</p>
            <button type='button' onClick={() => navigate("/")}>
              Back to All books
            </button>
          </div>
        ) : (
          <p>Loading Book...</p>
        )}
      </div>
    </div>
  );
}

export default SingleBook;
