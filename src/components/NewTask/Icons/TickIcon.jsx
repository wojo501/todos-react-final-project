import React, { useContext } from 'react'
import { TiTick } from "react-icons/ti"
import TaskContext from '../../../store/task-context';

const TickIcon = (props) => {
    const taskCtx = useContext(TaskContext);

    const clickHandler = (event) => {
        event.preventDefault();
        taskCtx.completeItem(props.id);
    }

    return (
        <span>
            <TiTick onClick={clickHandler} />
        </span>
    )
}

export default TickIcon