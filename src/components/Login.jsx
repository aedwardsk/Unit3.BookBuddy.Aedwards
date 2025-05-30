/* TODO - add your code to create a functional React component that renders a login form */
import React, { useState } from 'react';
import { loginUser } from '../API';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData.email, formData.password);
      console.log('User logged in successfully');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setToken(data.token);

      setFormData({
        email: '',
        password: '',
      });
      navigate('/account');
    } catch (error) {
      console.error('Failed to log in,', error);
      alert('Incorrect email or password');
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
