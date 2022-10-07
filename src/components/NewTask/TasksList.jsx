import React, { useContext } from 'react'
import Task from './Task';
import classes from "./TasksList.module.css"
import TaskContext from '../../store/task-context';

const TasksList = (props) => {
    const taskCtx = useContext(TaskContext);

    if (taskCtx.items.length === 0) {
        return <h2>Found no tasks</h2>
    }

    return (
        <ul className={classes.list}>
            {taskCtx.items.map((task) => (
                <Task
                    id={task.id}
                    key={task.id}
                    text={task.text}
                />
            ))}
        </ul>
    )
}

export default TasksList;
