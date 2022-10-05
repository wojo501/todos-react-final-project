import React, { useState } from 'react';
import './App.css';
import Bar from './components/InputBar/Bar';
import TasksList from './components/NewTask/TasksList';
import Card from './components/UI/Card';

function App() {
  const [newTask, setNewTask] = useState([
    {
      text: "my first task",
      id: "t1"
    }
  ])

  const saveHandler = (savedTask) => {
    setNewTask((prevState) => {
      return {
        ...prevState,
        savedTask
      };
    })
  }


  return (
    <div>
      <Bar onSave={saveHandler} />
      <TasksList items={newTask} />
    </div>
  );
}

export default App;
