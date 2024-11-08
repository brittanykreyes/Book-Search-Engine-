import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';  // Import the ADD_USER mutation

const SignupForm = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addUser] = useMutation(ADD_USER);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addUser({
        variables: { username, email, password },
      });
      localStorage.setItem('token', data.addUser.token);  // Store token in local storage
      onSignup(data.addUser.user);  // Call onSignup to update parent state
    } catch (err) {
      console.error('Error signing up:', err);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h3>Sign Up</h3>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
