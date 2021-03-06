import React from 'react';
import { shallow } from 'enzyme';

import BookShelf from '../BookShelf';
import Book from '../Book';

describe('<BookShelf />', function() {
  const mockOnShelfChange = jest.fn();
  const mockBookChecked = jest.fn();
  const title = 'Current Reading';
  const books = [
    {
      id: '1',
      title: 'harry potter',
      authors: ['jk rowling'],
      thumbnail: null,
      shelf: 'read',
      rating: 8
    },
    {
      id: '2',
      title: 'batman forever',
      authors: ['bruce wayne'],
      thumbnail: null,
      shelf: 'read',
      rating: 9
    }
  ];

  const component = shallow(
    <BookShelf
      title={title}
      books={books}
      onShelfChange={mockOnShelfChange}
      onBookChecked={mockBookChecked}
    />
  );

  it('has book shelf title', () => {
    const bookCover = component.find('.bookshelf-title');
    expect(bookCover).toHaveLength(1);
  });

  it('has two book components', () => {
    expect(component.find(Book)).toHaveLength(2);
  });
});
