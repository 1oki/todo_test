import React, { useEffect } from 'react';
import useTodoStore from '../store/useTodoStore';
import TodoItem from './TodoItem';
import { List, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const TodoList: React.FC = () => {
    const { todos, filter, fetchTodos, loadMoreTodos, hasMore, page} = useTodoStore();

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'incomplete') return !todo.completed;
        if (filter === 'favorite') return todo.favorite;
        return true;
    });

    return (
        <InfiniteScroll
        dataLength={filteredTodos.length}
        next={loadMoreTodos}
        hasMore={hasMore}
        loader={<Spin />}
        endMessage={<p style={{ textAlign: 'center' }}>All tasks have been loaded</p>}
        height={600}
        >
            <List
            itemLayout="horizontal"
            dataSource={filteredTodos}
            renderItem={todo => (
                <TodoItem key={todo.id} todo={todo} />
            )}
            />
        </InfiniteScroll>
        
    );
};

export default TodoList;
