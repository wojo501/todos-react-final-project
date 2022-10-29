import TaskContext from "./task-context";
import { useReducer, useCallback, useEffect } from "react";
import axios from "axios";

const defaultTaskState = {
    items: []
};
// FIXME
// change post request to delete request while deleting
// add enum to file instead of string commands
// fix different paths to query parameters
// optimize task reducer, taskProvider funcion 

const taskReducer = (state, action) => {

    if (action.type === "RELOAD") {
        console.log("DATA RELOAD")
        return {
            items: action.itemsArr
        }
    }

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
        }
        updatedElem.toDo = false;
        const updatedItems = [...state.items]
        console.log(updatedElem)
        updatedItems[changedElemIndex] = updatedElem
        return {
            items: updatedItems
        }
    }

    if (action.type === "INCOMPLETE") {
        const changedElemIndex = state.items.findIndex((elem) => {
            return elem.id === action.id.toString()
        })
        const updatedElem = state.items[changedElemIndex]
        if (!updatedElem.toDo) {
            updatedElem.text = updatedElem.text.replace("(DONE) ", "")
        }
        updatedElem.toDo = true;
        const updatedItems = [...state.items]
        console.log(updatedElem)
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

    const fetchTaskHandler = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:4000/app/addTask")
            if (!response.ok) {
                throw new Error("GET error")
            }
            const data = await response.json()
            return data

        } catch (error) {
            console.log(error)
        }
    }, [])

    useEffect(() => {
        fetchTaskHandler().then((taskData) => {
            console.log("USE EFFECT")
            dispatchTaskAction({
                type: "RELOAD",
                itemsArr: taskData
            })
        });
    }, []);

    const deleteItemHandler = async (id) => {
        dispatchTaskAction({ type: "DELETE", id: id });
        axios.post("http://localhost:4000/app/removeTask", { id: id })
            .then(response => console.log(response.data))

    };

    const completeItemHandler = (id) => {
        dispatchTaskAction({ type: "COMPLETE", id: id });
        axios.patch("http://localhost:4000/app/addTask", { id: id })
            .then(response => console.log(response.data))
    };

    const incompleteItemHandler = (id) => {
        dispatchTaskAction({ type: "INCOMPLETE", id: id });
        axios.patch("http://localhost:4000/app/addTask", { id: id })
            .then(response => console.log(response.data))
    };

    const editItemHandler = (item) => {
        dispatchTaskAction({ type: "EDIT", item: item });
        axios.patch("http://localhost:4000/app/removeTask", { text: item.text, id: item.id })
            .then(response => console.log(response.data))
    };

    const addItemHandler = (item) => {
        dispatchTaskAction({ type: "ADD", item: item });
        axios.post("http://localhost:4000/app/addTask", item)
            .then(response => console.log(response.data))
    }

    const taskContext = {
        items: taskState.items,
        deleteItem: deleteItemHandler,
        addItem: addItemHandler,
        completeItem: completeItemHandler,
        incompleteItem: incompleteItemHandler,
        editItem: editItemHandler
    };


    return (
        <TaskContext.Provider value={taskContext}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskProvider;