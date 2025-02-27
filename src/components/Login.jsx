/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState } from "react";
import { loginUser } from "../API";

function Login({ setToken }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData.email, formData.password);
      console.log("User logged in successfully", data);
      // Store the token and user details
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.token);
      //passed Empty objects to clear login.
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Failed to log in,", error);
    }
  };

  return (
    <div>
      <form className='loginForm' onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input type='email' value={formData.email} onChange={handleChange} id='email' name='email' required />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          value={formData.password}
          onChange={handleChange}
          id='password'
          name='password'
          required
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default Login;
