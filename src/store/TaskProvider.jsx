import TaskContext from "./task-context";
import { useReducer } from "react";

const defaultTaskState = {
    items: []
};

const taskReducer = (state, action) => {
    console.log(action.type)
    if (action.type === "ADD") {
        const updatedItems = state.items.concat(action.item);
        console.log("updatedItems ", updatedItems)
        return {
            items: updatedItems
        }
    };

    if (action.type === "COMPLETE") {
        console.log("STATE.ITEMS: ", state.items)
        const changedElem = state.items.find((elem) => {
            return elem.id === action.id.toString()
        })
        console.log("found elem", changedElem)
        console.log("TEXT", changedElem.text)
        if (changedElem.toDo) {
            changedElem.text = "(DONE) " + changedElem.text;
        } else {
            changedElem.text = changedElem.text.replace('(DONE)', '');;
        }
        changedElem.toDo = !changedElem.toDo
        console.log("CHANGED ELEM ", changedElem);
        return {
            items: state.items
        }
    }

    return defaultTaskState
}

const TaskProvider = (props) => {
    const [taskState, dispatchTaskAction] = useReducer(taskReducer, defaultTaskState)

    const deleteItemHandler = (id) => {
        dispatchTaskAction({ type: "DELETE", id: id });
    };

    const completeItemHandler = (id) => {
        dispatchTaskAction({ type: "COMPLETE", id: id });
    };

    const editItemHandler = (item) => {
        dispatchTaskAction({ type: "EDIT", item: item });
    };

    const addItemHandler = (item) => {
        dispatchTaskAction({ type: "ADD", item: item });
    }

    const taskContext = {
        items: taskState.items,
        deleteItem: deleteItemHandler,
        addItem: addItemHandler,
        completeItem: completeItemHandler,
        editItem: editItemHandler
    };


    return (
        <TaskContext.Provider value={taskContext}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskProvider;