import React from "react";
import { Route, Routes } from "react-router-dom";
import Account from "../components/Account";
import SingleBook from "../components/SingleBook";
import Books from "../components/Books";
import Login from "../components/Login";
import Register from "../components/Register";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Books />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/books/:bookId' element={<SingleBook />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
