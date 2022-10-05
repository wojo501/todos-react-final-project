import React from 'react'
import Task from './Task';

const TasksList = (props) => {
    console.log(props.items)

    const tasksList = props.items.map((task) => {
        <Task
            id={task.id}
            key={task.id}
            text={task.text}
        />
    })

    return (
        < ul > {tasksList}</ul >
    )
}

export default TasksList;
