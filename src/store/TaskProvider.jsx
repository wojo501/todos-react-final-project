import TaskContext from "./task-context";
import { useReducer, useCallback, useEffect } from "react";
import axios from "axios";

const States = Object.freeze({
    RELOAD: "RELOAD",
    ADD: "ADD",
    COMPLETE: "COMPLETE",
    INCOMPLETE: "INCOMPLETE",
    DELETE: "DELETE",
    EDIT: "EDIT"
});

const defaultTaskState = {
    items: []
};

// FIXME
// change text (DONE) to strikethrough text

const findItemById = (itemsArray, id) => {
    const changedElemIndex = itemsArray.findIndex((elem) => {
        return elem.id === id.toString()
    })
    const updatedElem = itemsArray[changedElemIndex]
    return [updatedElem, changedElemIndex]
}

const taskReducer = (state, action) => {

    if (action.type === States.RELOAD) {
        return {
            items: action.itemsArr
        }
    }

    if (action.type === States.ADD) {
        const updatedItems = state.items.concat(action.item);
        return {
            items: updatedItems
        }
    };

    if (action.type === States.COMPLETE) {
        const updatedElemAndIdx = findItemById(state.items, action.id)
        const updatedElem = updatedElemAndIdx[0];
        const changedElemIndex = updatedElemAndIdx[1];
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

    if (action.type === States.INCOMPLETE) {
        const updatedElemAndIdx = findItemById(state.items, action.id)
        const updatedElem = updatedElemAndIdx[0];
        const changedElemIndex = updatedElemAndIdx[1];

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

    if (action.type === States.DELETE) {
        const updatedItems = state.items.filter((item) => {
            return item.id !== action.id.toString()
        })
        return {
            items: updatedItems
        }
    }

    if (action.type === States.EDIT) {
        const updatedElemAndIdx = findItemById(state.items, action.item.id)
        const updatedElem = updatedElemAndIdx[0];
        const changedElemIndex = updatedElemAndIdx[1];

        const updatedItem = {
            ...updatedElem,
            text: action.item.text
        }
        const updatedItems = [...state.items];
        updatedItems[changedElemIndex] = updatedItem;
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
            const response = await fetch("http://localhost:4000/app/getTask")
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
            dispatchTaskAction({
                type: "RELOAD",
                itemsArr: taskData
            })
        });
    }, []);

    const deleteItemHandler = async (id) => {
        dispatchTaskAction({ type: States.DELETE, id: id });
        const url = "http://localhost:4000/app/deleteTask/" + id.toString()
        axios.delete(url)
            .then(response => console.log(response.data))

    };

    const completeItemHandler = (id) => {
        dispatchTaskAction({ type: States.COMPLETE, id: id });
        axios.patch("http://localhost:4000/app/updateTask/status", { id: id })
            .then(response => console.log(response.data))
    };

    const incompleteItemHandler = (id) => {
        dispatchTaskAction({ type: States.INCOMPLETE, id: id });
        axios.patch("http://localhost:4000/app/updateTask/status", { id: id })
            .then(response => console.log(response.data))
    };

    const editItemHandler = (item) => {
        dispatchTaskAction({ type: States.EDIT, item: item });
        axios.patch("http://localhost:4000/app/updateTask/text", { text: item.text, id: item.id })
            .then(response => console.log(response.data))
    };

    const addItemHandler = (item) => {
        dispatchTaskAction({ type: States.ADD, item: item });
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