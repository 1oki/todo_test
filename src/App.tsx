import React from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import TodoFilter from './components/TodoFilter';
import { Layout } from 'antd';
import { GlobalStyle } from './styles';

const { Header, Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <GlobalStyle />
      <Header>
        <h1>Todo List</h1>
      </Header>
      <Content>
        <AddTodo />
        <TodoFilter />
        <TodoList />
      </Content>
    </Layout>
  );
};

export default App;

