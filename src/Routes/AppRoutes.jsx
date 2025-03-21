import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Account from "../components/Account";
import SingleBook from "../components/SingleBook";
import Books from "../components/Books";
import Login from "../components/Login";
import Register from "../components/Register";

function AppRoutes({ searchQuery, token, setToken, handleLogout }) {
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const handleBookStatusChange = () => {
    setUpdateTrigger((prev) => !prev);
  };

  return (
    <>
      <Routes>
        <Route path='/' element={<Books searchQuery={searchQuery} onBookStatusChange={handleBookStatusChange} />} />
        <Route path='/login' element={<Login token={token} setToken={setToken} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/books/:id' element={<SingleBook />} />
        <Route
          path='/account'
          element={<Account handleLogout={handleLogout} updateTrigger={updateTrigger} token={token} />}
        />
      </Routes>
    </>
  );
}

export default AppRoutes;
