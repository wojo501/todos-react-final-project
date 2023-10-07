import React from "react";

const TaskContext = React.createContext({
    items: [],
    deleteItem: (id) => { },
    addItem: (item) => { },
    completeItem: (id) => { },
    incompleteItem: (id) => { },
    editItem: (item) => { }
});

export default TaskContext;