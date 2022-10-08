import { icon } from '@fortawesome/fontawesome-svg-core';
import React, { useContext, useState, useEffect, useRef } from 'react'
import DeleteIcon from './Icons/DeleteIcon';
import EditIcon from './Icons/EditIcon';
import TickIcon from './Icons/TickIcon';
import classes from "./Task.module.css"
import TaskContext from '../../store/task-context';

const Task = (props) => {
    const taskCtx = useContext(TaskContext);

    const currentTask = taskCtx.items.find((item) => {
        return item.id === props.id.toString()
    })
    const [edit, setEdit] = useState(false)
    const [editText, setEditText] = useState(currentTask.text)

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

    const inputValueHandler = (event) => {
        event.preventDefault()
        setEditText(event.target.value)
    }

    const inputHandler = (event) => {
        event.preventDefault();
        if (!edit) {
            setEdit(true)
            return
        }

        const changedTask = {
            ...currentTask,
            text: editText
        }
        taskCtx.editItem(changedTask)
        setEdit(false)
    }

    return (
        <li
            className={classes["task"]}
            id={props.id}
            key={props.id}
        >
            <form className={classes.form} onSubmit={inputHandler}>
                {edit ? (
                    <input
                        value={editText}
                        onChange={inputValueHandler}
                        ref={inputRef}
                    />
                ) : (
                    <span>{currentTask.text}</span>
                )}
                <React.Fragment>
                    <DeleteIcon className={classes.icon} id={props.id} />
                    <EditIcon className={classes.icon} item={currentTask} clickHandler={inputHandler} />
                    <TickIcon className={classes.icon} id={props.id} />
                </React.Fragment>
            </form>
        </li >
    )
}

export default Task;
