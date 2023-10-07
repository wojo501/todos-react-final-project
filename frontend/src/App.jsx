import React from 'react';
import './App.css';
import Bar from './components/InputBar/Bar';
import TasksList from './components/NewTask/TasksList';
import TaskProvider from './store/TaskProvider';


function App() {
  return (
    <TaskProvider>
      <Bar />
      <TasksList />
    </TaskProvider>
  );
}

export default App;
