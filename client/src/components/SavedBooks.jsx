import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';  // Query to fetch current user data
import { REMOVE_BOOK } from '../utils/mutations';  // Mutation to remove a book

const SavedBooks = () => {
  const { data } = useQuery(GET_ME);  // Fetch the current user
  const [removeBook] = useMutation(REMOVE_BOOK);  // Remove book mutation

  // Handle removing a saved book
  const handleDeleteBook = async (bookId) => {
    try {
      await removeBook({
        variables: { bookId },
      });
      alert('Book removed!');
    } catch (err) {
      console.error('Error removing book:', err);
    }
  };

  if (!data?.me) {
    return <div>You need to be logged in to view saved books.</div>;
  }

  return (
    <div>
      <h2>Saved Books</h2>
      {data.me.savedBooks.length === 0 ? (
        <p>No saved books.</p>
      ) : (
        <div>
          {data.me.savedBooks.map((book) => (
            <div key={book.bookId}>
              <h3>{book.title}</h3>
              <p>{book.authors.join(', ')}</p>
              <p>{book.description}</p>
              <img src={book.image} alt={book.title} />
              <a href={book.link} target="_blank" rel="noopener noreferrer">
                View on Google Books
              </a>
              <button onClick={() => handleDeleteBook(book.bookId)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedBooks;
