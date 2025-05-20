import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks, updateBookStatus } from '../API';
import fallbackImage from '../assets/books.png';

function Books({ searchQuery, onBookStatusChange }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const fetchedBooks = await fetchBooks();
        if (fetchedBooks && fetchedBooks.length > 0) setBooks(fetchedBooks);
        else setBooks([]);
      } catch (error) {
        console.error('Getting books error on fetch', error);
        setBooks([]);
      }
    };
    getBooks();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase())));
    }
  }, [searchQuery, books]);

  const handleClick = async (id) => {
    navigate(`/books/${id}`);
  };

  const handleAuthAction = async (action, bookId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const book = books.find((book) => book.id === bookId);
    if (!book) {
      alert('Book not found');
      return;
    }

    try {
      if (action === 'checked out' && !book.available) {
        alert('Book not available for checkout');
        return;
      }

      await updateBookStatus({ token, bookId, action });

      alert(`Book ${bookId} ${action} successfully!`);
      setBooks((prevBooks) => prevBooks.map((b) => (b.id === bookId ? { ...b, available: action === 'returned' } : b)));

      // Trigger the update in the Account component
      onBookStatusChange();
    } catch (error) {
      console.error(`Failed to ${action} book`, error);
      alert(`Failed to ${action} book`);
    }
  };

  return (
    <div>
      <h1 className='books-heading'>Books</h1>
      <div className='books-container'>
        {books.length === 0 ? (
          <p>Loading books...</p>
        ) : filteredBooks.length > 0 ? (
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
              <p>{book.available ? 'Available' : 'Not Available'}</p>
              <button type='button' onClick={() => handleClick(book.id)}>
                See Book Details
              </button>
              <button type='button' onClick={() => handleAuthAction('checked out', book.id)}>
                Check Out
              </button>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}

export default Books;
