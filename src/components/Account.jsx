import React, { useEffect, useState } from "react";
import { fetchAccount } from "../API";
import { fetchReservations } from "../API";
import { deleteReservation } from "../API";

function Account({ handleLogout, updateTrigger, token }) {
  const [account, setAccount] = useState(null);
  const [resBooks, setResBooks] = useState([]);

  const handleReturnBook = async (reservationId) => {
    try {
      await deleteReservation({ token, reservationId });
      setResBooks((prev) => prev.filter((reservation) => reservation.id !== reservationId));
      alert("Book was returned successful");
    } catch (error) {
      console.error("Failed to return book", error);
      alert("Failed to return book");
    }
  };
  useEffect(() => {
    if (!token) return;
    const getAccount = async () => {
      try {
        const data = await fetchAccount({ token });
        setAccount(data);
        // console.log("Fetch Account", data);
      } catch (error) {
        console.error("Failed to fetch account", error);
      }
    };
    getAccount();
  }, [token]);

  useEffect(() => {
    if (!token) return;
    const getResBooks = async () => {
      try {
        const fetchedResBooks = await fetchReservations({ token });
        console.log("Fetch Reserved books", fetchedResBooks);
        if (fetchedResBooks && fetchedResBooks.reservation && fetchedResBooks.reservation.length > 0)
          setResBooks(fetchedResBooks.reservation);
      } catch (error) {
        console.error("Getting res books error on fetch", error);
      }
    };
    getResBooks();
  }, [updateTrigger, token]);

  if (!token) {
    return <div>Please log in or create an account to see your account details.</div>;
  }

  return (
    <div>
      <h2>Account Page</h2>
      {account ? (
        <div>
          <p>
            Name: {account.firstname} {account.lastname}
          </p>
          <p>Email: {account.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading account details...</p>
      )}
      <div className='res-books-container'>
        {resBooks.length > 0 ? (
          resBooks.map((reserved) => (
            <div key={reserved.id} className='res-book-card'>
              <img src={reserved.coverimage} alt={`Image of ${reserved.title}`} />
              <h4>{reserved.title}</h4>
              <p>by {reserved.author}</p>
              <p>description {reserved.description}</p>
              <button onClick={() => handleReturnBook(reserved.id)}>Return Book</button>
            </div>
          ))
        ) : (
          <p>Loading books...</p>
        )}
      </div>
    </div>
  );
}

export default Account;
