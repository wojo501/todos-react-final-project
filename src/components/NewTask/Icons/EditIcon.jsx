import React, { useContext } from 'react'
import { AiFillEdit } from "react-icons/ai"
import TaskContext from '../../../store/task-context';


const EditIcon = (props) => {
    const taskCtx = useContext(TaskContext);

    const clickHandler = (event) => {
        event.preventDefault();
        taskCtx.editItem(props.item);
    }

    return (
        <span>
            <AiFillEdit onClick={props.clickHandler} />
        </span>
    )
}

export default EditIcon