import React, { useState, useContext } from 'react';
import TaskContext from './store/task-context';
import './App.css';
import Bar from './components/InputBar/Bar';
import TasksList from './components/NewTask/TasksList';
import Card from './components/UI/Card';
import TaskProvider from './store/TaskProvider';

const DUMMY_TASK = [
  {
    text: "my first task",
    id: "t1"
  }
]

function App() {
  const taskCtx = useContext(TaskContext);

  const saveHandler = (savedTask) => {
    taskCtx.addItem(savedTask)
  }


  return (
    <div>
      <Bar onSave={saveHandler} />
      <TasksList items={taskCtx.items} />
    </div>
  );
}

export default App;
