import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [saveBook] = useMutation(SAVE_BOOK);

  const handleSaveBook = async (book) => {
    try {
      await saveBook({
        variables: {
          bookId: book.id,
          title: book.title,
          authors: book.authors,
          description: book.description,
          image: book.image,
          link: book.link,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for books"
      />
      {/* Render search results based on your API */}
      <button onClick={() => handleSaveBook(someBook)}>Save This Book!</button>
    </div>
  );
};

export default SearchBooks;
