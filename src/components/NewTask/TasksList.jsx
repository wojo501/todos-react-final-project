import React from 'react'
import Task from './Task';
import classes from "./TasksList.module.css"

const TasksList = (props) => {

    if (props.items.length === 0) {
        return <h2>Found no tasks</h2>
    }

    return (
        <ul className={classes.list}>
            {props.items.map((task) => (
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
