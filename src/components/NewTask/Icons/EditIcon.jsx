import React, { useContext } from 'react'
import { AiFillEdit } from "react-icons/ai"
import TaskContext from '../../../store/task-context';


const EditIcon = () => {
    const taskCtx = useContext(TaskContext);


    return (
        <span>
            <AiFillEdit />
        </span>
    )
}

export default EditIcon