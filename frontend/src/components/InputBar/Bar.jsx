import { useState, useContext, useRef } from "react";
import classes from "./Bar.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import TaskContext from "../../store/task-context";
import { useNavigate, useParams } from "react-router-dom";

const Bar = (props) => {
    const taskCtx = useContext(TaskContext);
    const params = useParams();
    const navigate = useNavigate();
    const [taskText, setTaskText] = useState("");

    const inputRef = useRef();
    const clickPreventHandler = (event) => {
        if (inputRef.current.value.trim() === "") {
            event.preventDefault();
        }
    }

    const inputHandler = (event) => {
        setTaskText(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const taskData = {
            id: Math.random().toString(),
            text: taskText,
            toDo: true,
            userId: params.userId,
        }
        taskCtx.addItem(taskData);
        console.log("SAVED TASK: ", taskData);
        setTaskText("");
    }

    function navigateHandler(){
        navigate('/login');
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
                        ref={inputRef}
                    />
                    <Button
                        type="submit"
                        onClick={clickPreventHandler}
                    >Add Task</Button>
                    <Button
                        onClick={navigateHandler}
                    >Log Out</Button>
                </div>
            </form>
        </Card>
    )
}

export default Bar;