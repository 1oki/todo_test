import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';
import useTodoStore from '../store/useTodoStore';

jest.mock('../store/useTodoStore');

describe('TodoItem Component', () => {
  const todo = {
    id: 1,
    title: 'Test Todo',
    completed: false,
    favorite: false,
  };

  it('toggles complete status', () => {
    const toggleComplete = jest.fn();
    (useTodoStore as unknown as jest.Mock).mockReturnValue({ toggleComplete });

    const { getByText } = render(<TodoItem todo={todo} />);

    fireEvent.click(getByText('Complete'));

    expect(toggleComplete).toHaveBeenCalledWith(todo.id);
  });

  it('toggles favorite status', () => {
    const toggleFavorite = jest.fn();
    (useTodoStore as unknown as jest.Mock).mockReturnValue({ toggleFavorite });

    const { getByText } = render(<TodoItem todo={todo} />);

    fireEvent.click(getByText('Favorite'));

    expect(toggleFavorite).toHaveBeenCalledWith(todo.id);
  });

  it('deletes todo', () => {
    const deleteTodo = jest.fn();
    (useTodoStore as unknown as jest.Mock).mockReturnValue({ deleteTodo });

    const { getByText } = render(<TodoItem todo={todo} />);

    fireEvent.click(getByText('Delete'));

    expect(deleteTodo).toHaveBeenCalledWith(todo.id);
  });
});
