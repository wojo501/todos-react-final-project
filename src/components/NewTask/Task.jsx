import { icon } from '@fortawesome/fontawesome-svg-core';
import React, { useState } from 'react'
import DeleteIcon from './Icons/DeleteIcon';
import EditIcon from './Icons/EditIcon';
import TickIcon from './Icons/TickIcon';
import classes from "./Task.module.css"

const Task = (props) => {
    const [edit, setEdit] = useState(false);


    return (
        <li
            className={classes["task"]}
            id={props.id}
            key={props.id}
        >
            <form className={classes.form}>
                {edit ? (
                    <input
                        value={props.text}
                    />
                ) : (
                    <span>{props.text}</span>
                )}
                <React.Fragment>
                    <DeleteIcon className={classes.icon} />
                    <EditIcon className={classes.icon} />
                    <TickIcon className={classes.icon} id={props.id} />
                </React.Fragment>
            </form>
        </li >
    )
}

export default Task;
