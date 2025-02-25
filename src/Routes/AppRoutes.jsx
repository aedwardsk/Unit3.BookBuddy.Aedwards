import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Account from "../components/Account";
import SingleBook from "../components/SingleBook";
import Books from "../components/Books";
import Login from "../components/Login";
import Register from "../components/Register";

function AppRoutes({ searchQuery }) {
  return (
    <>
      <Routes>
        <Route path='/' element={<Books searchQuery={searchQuery} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/books/:id' element={<SingleBook />} />
        {/* not sure if this should be /books/:bookId */}
        <Route path='/account' element={<Account />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
