import TaskContext from "./task-context";
import { useReducer } from "react";

const defaultTaskState = {
    items: []
};


const taskReducer = (state, action) => {



    if (action.type === "ADD") {
        const updatedItems = state.items.concat(action.item);
        return {
            items: updatedItems
        }
    };

    if (action.type === "COMPLETE") {
        const changedElemIndex = state.items.findIndex((elem) => {
            return elem.id === action.id.toString()
        })
        const updatedElem = state.items[changedElemIndex]
        if (updatedElem.toDo) {
            updatedElem.text = "(DONE) " + updatedElem.text;
        } else {
            updatedElem.text = updatedElem.text.replace('(DONE)', '');;
        }
        updatedElem.toDo = !updatedElem.toDo
        const updatedItems = [...state.items]
        updatedItems[changedElemIndex] = updatedElem
        return {
            items: updatedItems
        }
    }

    if (action.type === "DELETE") {
        const updatedItems = state.items.filter((item) => {
            return item.id !== action.id.toString()
        })
        return {
            items: updatedItems
        }
    }

    if (action.type === "EDIT") {
        const editItemIndex = state.items.findIndex((elem) => {
            return elem.id === action.item.id.toString()
        })
        const existingItem = state.items[editItemIndex]
        const updatedItem = {
            ...existingItem,
            text: action.item.text
        }
        const updatedItems = [...state.items];
        updatedItems[editItemIndex] = updatedItem;
        return {
            items: updatedItems
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