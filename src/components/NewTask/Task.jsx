import React from 'react'

const Task = (props) => {
    return (
        <li
            id={props.id}
            key={props.id}
        >
            {props.text}
        </li>
    )
}

export default Task;
