import React, { useContext } from 'react'
import { TiTick } from "react-icons/ti"
import TaskContext from '../../../store/task-context';

const TickIcon = (props) => {
    const taskCtx = useContext(TaskContext);

    const clickHandler = (event) => {
        event.preventDefault();

        if (props.toDo) {
            taskCtx.completeItem(props.id);
        }
        if (!props.toDo) {
            taskCtx.incompleteItem(props.id)
        }

    }

    return (
        <span>
            <TiTick onClick={clickHandler} />
        </span>
    )
}

export default TickIcon