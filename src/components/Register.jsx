/* TODO - add your code to create a functional React component that renders a registration form */
import React from "react";
import { registerUser } from "../API";
import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
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
      const data = await registerUser(formData.firstname, formData.lastname, formData.email, formData.password);
      console.log("User registered successfully", data);
      // Store the token in local storage or state
      localStorage.setItem("token", data.token);
      // Optionally, you can store other user details as well
      localStorage.setItem("user", JSON.stringify(data.user));
    } catch (error) {
      console.error("Failed to register,", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='firstname'>First Name</label>
        <input
          type='text'
          value={formData.firstname}
          onChange={handleChange}
          id='firstname'
          name='firstname'
          required
        />
        <label htmlFor='lastname'>Last Name</label>
        <input type='text' value={formData.lastname} onChange={handleChange} id='lastname' name='lastname' required />
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
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

export default Register;
