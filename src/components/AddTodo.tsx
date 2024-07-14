import React, { useState } from 'react';
import useTodoStore from '../store/useTodoStore';
import { Input, Button } from 'antd';

const AddTodo: React.FC = () => {
    const [title, setTitle] = useState('');
    const { addTodo } = useTodoStore();

    const handleSubmit = () => {
        addTodo(title);
        setTitle('');
    };

    return (
        <div>
        <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task"
        />
        <Button onClick={handleSubmit}>Add</Button>
        </div>
    );
};

export default AddTodo;
