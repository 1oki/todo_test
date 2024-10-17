# To-Do List Application with Infinite Scroll and REST API

This project is a **React** and **TypeScript** based To-Do list application that integrates with a REST API using **Axios** for data fetching. It also supports **infinite scrolling** for dynamically loading tasks, utilizes **Zustand** for state management, and is styled with **Ant Design** and **Styled Components**.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Infinite Scroll**: Automatically loads more tasks from the server as you scroll down.
- **REST API Integration**: Fetches and updates tasks using a REST API via Axios.
- **Add Tasks**: Users can add new tasks which are persisted to the backend.
- **Delete Tasks**: Tasks can be deleted and the changes are reflected in the backend.
- **Filter Tasks**: Filter tasks based on their status (all, completed, or pending).
- **State Management with Zustand**: Efficient state management using the Zustand library.
- **UI Styling with Ant Design**: Modern and responsive UI built using Ant Design components.
- **Styled Components**: Custom styles and themes applied through Styled Components.
- **Unit Testing**: Tests are implemented using Jest and React Testing Library.

## Tech Stack

- **React** — Frontend JavaScript library
- **TypeScript** — Static typing for JavaScript
- **Zustand** — State management library
- **Axios** — HTTP client for API calls
- **Ant Design** — Component library for UI styling
- **Styled Components** — CSS-in-JS for styled React components
- **Jest** — JavaScript testing framework
- **React Testing Library** — Utilities for testing React components
- **Webpack** — Module bundler for JavaScript applications

## Installation

Follow these steps to run the project locally:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/todo_test.git
    cd todo_test
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the development server**:

    ```bash
    npm start
    ```

4. **Open the app**:

    Navigate to `http://localhost:3000` to view the application in the browser.

## Usage

- **Add a new task**: Enter a task description in the input field and click the "Add Task" button to send the task to the server.
- **Delete a task**: Click the "Delete" button next to a task to remove it from both the frontend and the server.
- **Filter tasks**: Use the filter buttons to view all tasks, completed tasks, or pending tasks.
- **Infinite Scroll**: Scroll down the list of tasks, and the app will automatically load more tasks from the server using Axios.
  
## REST API Integration

This application interacts with a backend API to manage tasks. The API endpoints are used as follows:
- **GET** `/api/tasks`: Fetch the list of tasks.
- **POST** `/api/tasks`: Add a new task.
- **DELETE** `/api/tasks/:id`: Delete a task by its ID.

The HTTP requests are handled using **Axios**. Example of a GET request:

```javascript
import axios from 'axios';

axios.get('/api/tasks')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching tasks:', error);
  });
```

## Testing

To run the tests for this project, use the following command:
```bash
npm test
```

Test coverage includes:

AddTodo: Tests for adding new tasks and sending them to the API.
TodoItem: Tests for rendering, deleting tasks, and ensuring synchronization with the backend.
TodoList: Tests for infinite scrolling, task filtering, and correct API interaction.

## Folder Structure

```bash
todo_test/
│
├── public/                     # Public files
│   └── index.html              # Main HTML file
│
├── src/                        # Source files
│   ├── components/             # React components
│   │   ├── AddTodo.tsx         # Form to add new tasks with Ant Design and Styled Components
│   │   ├── AddTodo.test.tsx    # Unit tests for AddTodo
│   │   ├── TodoItem.tsx        # Individual task component with API integration
│   │   ├── TodoItem.test.tsx   # Unit tests for TodoItem
│   │   ├── TodoList.tsx        # Task list, infinite scroll, and API integration
│   │   ├── TodoList.test.tsx   # Unit tests for TodoList
│   ├── store/                  # Zustand store for state management
│   │   └── useTodoStore.ts     # Zustand store for managing the to-do list state
│   ├── api/                    # API interaction using Axios
│   │   └── tasksApi.ts         # Axios requests for tasks
│   ├── App.tsx                 # Main App component
│   ├── index.tsx               # Application entry point
│   ├── index.css               # Global styles
│   ├── styles.ts               # Styled Components styles
│
├── jest.config.js              # Jest configuration
├── webpack.config.js           # Webpack configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project metadata and dependencies
└── README.md                   # Project documentation (you are here)
```

## Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
