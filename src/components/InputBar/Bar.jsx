import { useState, useContext } from "react";
import classes from "./Bar.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import TaskContext from "../../store/task-context";

const Bar = (props) => {
    const taskCtx = useContext(TaskContext);
    const [taskText, setTaskText] = useState("");

    const inputHandler = (event) => {
        setTaskText(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const taskData = {
            id: Math.random().toString(),
            text: taskText,
            toDo: true,
        }
        console.log("SAVED TASK: ", taskData);
        taskCtx.addItem(taskData);
        setTaskText("");
    }

    return (
        <Card className={classes.card}>
            <form onSubmit={submitHandler}>
                <div className={classes.input}>
                    <label className={classes.label}>Next Task</label>
                    <input
                        type="text"
                        onChange={inputHandler}
                        value={taskText}
                    />
                    <Button
                        type="submit"
                    >Add Task</Button>
                </div>
            </form>
        </Card>
    )
}

export default Bar;