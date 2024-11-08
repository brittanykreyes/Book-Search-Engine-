import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';  // Import the SAVE_BOOK mutation

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [saveBook] = useMutation(SAVE_BOOK);

  // Search for books from Google Books API when searchTerm changes
  const handleSearch = async (event) => {
    event.preventDefault();
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
    const data = await response.json();
    setResults(data.items || []);
  };

  // Save the selected book to the user's profile
  const handleSaveBook = async (book) => {
    try {
      await saveBook({
        variables: {
          bookId: book.id,
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks?.thumbnail,
          link: book.volumeInfo.infoLink,
        },
      });
      alert('Book saved!');
    } catch (err) {
      console.error('Error saving book:', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for books"
        />
        <button type="submit">Search</button>
      </form>

      {results.length > 0 && (
        <div>
          {results.map((book) => (
            <div key={book.id}>
              <h3>{book.volumeInfo.title}</h3>
              <p>{book.volumeInfo.authors?.join(', ')}</p>
              <p>{book.volumeInfo.description}</p>
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
              <a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">
                View on Google Books
              </a>
              <button onClick={() => handleSaveBook(book)}>Save This Book!</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBooks;

