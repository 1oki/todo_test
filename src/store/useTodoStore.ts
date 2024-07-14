import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'https://cms.dev-land.host/api';
const API_TOKEN = 'a56017bfd8f1a9d1c8d012e881ef7df90ddc4e3d74e61a27b82fa975cfe37571fcb0e7617258e871291c4315b68c1c410274fb19269becf5dae7b5372d611d66c605c701817bd70f8fcd39aa44973e95fb1dff1b36e3271ba4bf890e074e52d9b9feddcee0947e588d7b5f6eef4bd4ead3993c6ee7b35ffddf22012c2b5589ed'

type Todo = {
    id: number;
    title: string;
    completed: boolean;
    favorite: boolean;
};

type Filter = 'all' | 'completed' | 'incomplete' | 'favorite' ;

type TodoState = {
    todos: Todo[];
    filter: Filter;
    page: number;
    hasMore: boolean;
    fetchTodos: () => void;
    loadMoreTodos: () => void;
    addTodo?: (title: string) => void;
    deleteTodo?: (id: number) => void;
    toggleComplete?: (id: number, completed: boolean) => void;
    toggleFavorite?: (id: number) => void;
    setFilter: (filter: Filter) => void;
};

const getProcessData = (data) => {
    return data.map((task) => transformTask(task));
}
const transformTask = (task) => {
    return {
        id:task.id,
        title: task.attributes.title,
        completed: task.attributes.status === 'completed' ? true : false,
        favorite: false,
    }
}

const useTodoStore = create<TodoState>()((set, get) => ({
    todos: [],
    filter: 'all',
    page: 1,
    hasMore: true,
    fetchTodos: async () => {
        const { page, todos } = get();
        const response = await axios.get(`${API_URL}/tasks?pagination%5Bpage%5D=1`, {
            headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            },
        });
        const data = await response.data.data;
        const processedData = getProcessData(data)
        const favoriteTodos = JSON.parse(localStorage.getItem('favoriteTodos') || '[]');
        const newTodos = processedData.map((todo: Todo) => ({
            ...todo,
            favorite: favoriteTodos.includes(todo.id),
          }));

        set({
            todos: [...todos, ...newTodos],
            page: page + 1,
            hasMore: data.length === 25,
          });
    },
    loadMoreTodos: async () => {
        const { page, todos } = get();
        const response = await axios.get(`${API_URL}/tasks?pagination%5Bpage%5D=${page }`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        const data = await response.data.data;
        const processedData = getProcessData(data)
        const favoriteTodos = JSON.parse(localStorage.getItem('favoriteTodos') || '[]');
        const newTodos = processedData.map((todo: Todo) => ({
            ...todo,
            favorite: favoriteTodos.includes(todo.id),
        }));
        set({
          todos: [...todos, ...newTodos],
          page: page + 1,
          hasMore: response.data.length === 25,
        });
    },
    addTodo: async (title: string) => {
        await axios.post(`${API_URL}/tasks`, { 
            data:{
                title: title,
                description: title,
                status: 'notCompleted',
            }
        }, {
            headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            },
        })
        .then(function (response) {
            console.log('add task response data',response.data);
            set((state) => ({ todos: [...state.todos, response.data.data.attributes] }));
        })
        .catch(function (error) {
            if (error.response) {
                console.log('Server responded with status code:', error.response.status);
                console.log('Response data:', error.response.data);
              } else if (error.request) {
                console.log('No response received:', error.request);
              } else {
                console.log('Error creating request:', error.message);
              }
        });

        const newTask = {
            title: title,
            completed: 'notCompleted',
            favorite: false,
        }
        
    },
    deleteTodo: async (id: number) => {
        await axios.delete(`${API_URL}/tasks/${id}`, {
            headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            },
        });
        set((state) => ({ todos: state.todos.filter(todo => todo.id !== id) }));
    },
    toggleComplete: async (id: number, completed: boolean) => {
        await axios.put(`${API_URL}/tasks/${id}`, { 
            data:{
                status: completed ? 'notCompleted' : 'complete',
            }
        }, {
            headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            },
        })
        .then(function (response) {
            console.log('toggleComplete response data',response.data);
        })
        .catch(function (error) {
            if (error.response) {
                console.log('Server responded with status code:', error.response.status);
                console.log('Response data:', error.response.data);
              } else if (error.request) {
                console.log('No response received:', error.request);
              } else {
                console.log('Error creating request:', error.message);
              }
        });
        set((state) => ({
            todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
        }));
    },
    toggleFavorite: async (id: number) => {
        const { todos } = get();
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, favorite: !todo.favorite } : todo
        );
        set({ todos: updatedTodos });
        const favoriteTodos = updatedTodos.filter(todo => todo.favorite).map(todo => todo.id);
        localStorage.setItem('favoriteTodos', JSON.stringify(favoriteTodos));
        },
    setFilter: (filter: Filter) => set({ filter })
  })
);

export default useTodoStore;
