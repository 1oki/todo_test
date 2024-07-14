import React from 'react';
import useTodoStore from '../store/useTodoStore';
import { List, Button } from 'antd';

type TodoItemProps = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    favorite: boolean;
  };
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { deleteTodo, toggleComplete, toggleFavorite } = useTodoStore();

  return (
    <List.Item
      actions={[
        <Button onClick={() => toggleComplete(todo.id, todo.completed)}>
          {todo.completed ? 'Undo' : 'Complete'}
        </Button>,
        <Button onClick={() => toggleFavorite(todo.id)}>
          {todo.favorite ? 'Unfavorite' : 'Favorite'}
        </Button>,
        <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>,
      ]}
    >
      <List.Item.Meta
        title={todo.title}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
      />
    </List.Item>
  );
};

export default TodoItem;
