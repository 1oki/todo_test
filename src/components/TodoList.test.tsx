import React from 'react';
import { render } from '@testing-library/react';
import TodoList from './TodoList';
import useTodoStore from '../store/useTodoStore';

jest.mock('../store/useTodoStore');

describe('TodoList Component', () => {
  const todos = [
    { id: 1, title: 'Test Todo 1', completed: false, favorite: false },
    { id: 2, title: 'Test Todo 2', completed: true, favorite: false },
    { id: 3, title: 'Test Todo 3', completed: false, favorite: true },
  ];

  it('renders todos', () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todos,
      filter: 'all',
      fetchTodos: jest.fn(),
      loadMoreTodos: jest.fn(),
      hasMore: false,
    });

    const { getByText } = render(<TodoList />);

    expect(getByText('Test Todo 1')).toBeInTheDocument();
    expect(getByText('Test Todo 2')).toBeInTheDocument();
    expect(getByText('Test Todo 3')).toBeInTheDocument();
  });

  it('filters completed todos', () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todos,
      filter: 'completed',
      fetchTodos: jest.fn(),
      loadMoreTodos: jest.fn(),
      hasMore: false,
    });

    const { queryByText } = render(<TodoList />);

    expect(queryByText('Test Todo 1')).not.toBeInTheDocument();
    expect(queryByText('Test Todo 2')).toBeInTheDocument();
    expect(queryByText('Test Todo 3')).not.toBeInTheDocument();
  });

  it('filters incomplete todos', () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todos,
      filter: 'incomplete',
      fetchTodos: jest.fn(),
      loadMoreTodos: jest.fn(),
      hasMore: false,
    });

    const { queryByText } = render(<TodoList />);

    expect(queryByText('Test Todo 1')).toBeInTheDocument();
    expect(queryByText('Test Todo 2')).not.toBeInTheDocument();
    expect(queryByText('Test Todo 3')).toBeInTheDocument();
  });

  it('filters favorite todos', () => {
    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      todos,
      filter: 'favorite',
      fetchTodos: jest.fn(),
      loadMoreTodos: jest.fn(),
      hasMore: false,
    });

    const { queryByText } = render(<TodoList />);

    expect(queryByText('Test Todo 1')).not.toBeInTheDocument();
    expect(queryByText('Test Todo 2')).not.toBeInTheDocument();
    expect(queryByText('Test Todo 3')).toBeInTheDocument();
  });
});
