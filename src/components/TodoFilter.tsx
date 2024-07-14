import React from 'react';
import useTodoStore from '../store/useTodoStore';
import { Menu } from 'antd';

const TodoFilter: React.FC = () => {
    const { filter, setFilter } = useTodoStore();

    return (
        <Menu
        mode="horizontal"
        selectedKeys={[filter]}
        onClick={(e) => setFilter(e.key as any)}
        >
        <Menu.Item key="all">Все</Menu.Item>
        <Menu.Item key="completed">Completed</Menu.Item>
        <Menu.Item key="incomplete">Incomplete</Menu.Item>
        <Menu.Item key="favorite">Favorite</Menu.Item>
        </Menu>
    );
};

export default TodoFilter;
