# Book Search App with GraphQL API

## Description

The **Book Search App** allows users to search for books using the Google Books API, save their favorite books to their account, and view their saved books list. This application has been refactored to use a **GraphQL API** powered by **Apollo Server**, replacing the original REST API. It leverages the **MERN** stack (MongoDB, Express, React, Node.js) with **Apollo Client** on the front-end for seamless data fetching and mutation.

Users can:
- Search for books by title or author.
- Save books to their account.
- View and manage their saved books.
- Log in, sign up, and manage user sessions.

The application also features **JWT authentication** and integrates **Apollo Server** to manage GraphQL queries and mutations.

## Features

- **Book Search**: Users can search for books from the Google Books API. Each book result includes the title, author(s), description, image, and a link to the Google Books page.
- **Save Books**: After logging in, users can save books to their account and access a list of saved books.
- **View Saved Books**: Users can view, and remove books from their saved list.
- **Authentication**: Users can log in, sign up, and maintain sessions using JWT tokens.
- **GraphQL API**: Replaces the REST API with GraphQL queries and mutations, powered by Apollo Server.
  
## User Story

**As an avid reader**, I want to search for new books to read so that I can keep a list of books to purchase.

---

