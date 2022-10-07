import TaskContext from "./task-context";
import { useReducer } from "react";

const defaultTaskState = {
    items: [{ id: 0, text: "DEFAULT" }]
};

const taskReducer = (state, action) => {
    console.log(action.type)
    if (action.type === "ADD") {
        const updatedItems = state.items.concat(action.item);
        return {
            items: updatedItems
        }
    };
    if (action.type === "COMPLETE") {
        console.log("STATE.ITEMS: ", state.items)
        const changedElem = state.items.find((elem) => {
            return elem.id === action.id.toString()
        })
        console.log("CHANGED ELEM ", changedElem);
        // changedElem.text = "(DONE) " + changedElem.text;
        return {
            items: state.items
        }
    }

    console.log('DEFAULT STATE')
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