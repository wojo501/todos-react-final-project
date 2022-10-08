import React, { useContext } from 'react'
import { AiFillDelete } from "react-icons/ai"
import TaskContext from '../../../store/task-context';

const DeleteIcon = (props) => {
    const taskCtx = useContext(TaskContext);

    const clickHandler = (event) => {
        event.preventDefault();
        taskCtx.deleteItem(props.id);
    }

    return (
        <span>
            <AiFillDelete onClick={clickHandler} />
        </span>
    )
}

export default DeleteIcon