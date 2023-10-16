import Bar from "../components/InputBar/Bar";
import TasksList from "../components/NewTask/TasksList";
import TaskProvider from "../store/TaskProvider";

function TasksPage() {
    return (
      <TaskProvider>
        <Bar />
        <TasksList />
      </TaskProvider>
    );
  }

export default TasksPage;
