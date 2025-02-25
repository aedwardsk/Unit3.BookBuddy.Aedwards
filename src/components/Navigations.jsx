/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import React from "react";
import { Link } from "react-router-dom";
import bookLogo from "../assets/books.png";
import SearchBar from "./SearchBar";

export default function Navigations({ onSearch, clearSearch }) {
  return (
    <nav>
      <Link to='/' onClick={clearSearch} className='title'>
        <h1>
          <img id='logo-image' src={bookLogo} alt='Library App Logo' />
          Library App
        </h1>
      </Link>
      <ul className='nav-links'>
        <li>
          <Link to='/' onClick={clearSearch}>
            Books
          </Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/account'>Account</Link>
        </li>
        <li>
          <SearchBar onSearch={onSearch} onClick={clearSearch} />
        </li>
      </ul>
    </nav>
  );
}
