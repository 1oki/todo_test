import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddTodo from './AddTodo';
import useTodoStore from '../store/useTodoStore';

jest.mock('../store/useTodoStore');

describe('AddTodo Component', () => {
    it('adds a new todo', () => {
        const addTodo = jest.fn();
        (useTodoStore as unknown as jest.Mock).mockReturnValue({ addTodo });

        const { getByPlaceholderText, getByText } = render(<AddTodo />);

        fireEvent.change(getByPlaceholderText('Add a new task'), { target: { value: 'Test Todo' } });
        fireEvent.click(getByText('Add'));

        expect(addTodo).toHaveBeenCalledWith('Test Todo');
    });
});
