import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';  // Import the LOGIN_USER mutation

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser] = useMutation(LOGIN_USER);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { email, password },
      });
      localStorage.setItem('token', data.login.token);  // Store token in local storage
      onLogin(data.login.user);  // Call onLogin to update parent state
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h3>Login</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
