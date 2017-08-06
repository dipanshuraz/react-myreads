import React from 'react';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom';
import * as booksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    booksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  updateShelf = (updatedBook, shelf) => {
    booksAPI.update(updatedBook, shelf).then(res => {
      this.setState(state => {
        let currentBooks = [];
        const bookFoundInLibrary = state.books.find(book => book.id === updatedBook.id);

        if (bookFoundInLibrary) {
          currentBooks = state.books.map(book => {
            if (book.id === updatedBook.id) {
              book.shelf = shelf;
            }
            return book;
          });
        } else {
          updatedBook.shelf = shelf;
          currentBooks = state.books.concat([updatedBook]);
        }

        return { books: currentBooks };
      });
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() =>
          <ListBooks books={this.state.books} onShelfChange={this.updateShelf} />
        } />
        <Route path='/search' render={() =>
          <SearchBooks
            currentBooks={this.state.books}
            onShelfChange={this.updateShelf}
          />
        } />
      </div>
    )
  }
}

export default BooksApp;
