import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';

import SearchBooks from './components/SearchBooks';
import SavedBooks from './components/SavedBooks';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navbar from './components/Navbar'; // A simple navigation bar component

import { GET_ME } from './utils/queries'; // Query to fetch the current logged-in user
import { useQuery } from '@apollo/client';
import './styles.css';  // Import the CSS file in App.jsx


const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { data, loading } = useQuery(GET_ME);  // Fetch current user data

  // Handle user login (set user state)
  useEffect(() => {
    if (data) {
      setLoggedInUser(data.me);
    }
  }, [data]);

  // Apollo Client setup
  const client = new ApolloClient({
    uri: '/graphql',  // The GraphQL server URI
    cache: new InMemoryCache(),
  });

  if (loading) return <div>Loading...</div>;

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                loggedInUser ? <SearchBooks /> : <LoginForm onLogin={(user) => setLoggedInUser(user)} />
              }
            />
            <Route
              path="/signup"
              element={<SignupForm onSignup={(user) => setLoggedInUser(user)} />}
            />
            <Route
              path="/saved"
              element={loggedInUser ? <SavedBooks /> : <LoginForm onLogin={(user) => setLoggedInUser(user)} />}
            />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
