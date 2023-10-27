import { useEffect, useState } from "react";
import TasksList from "./components/TasksList";
import AddTaskForm from "./components/AddTaskForm";
import axios from "./services/axios";

const App = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    axios.get('/task').then(res => setTasks(res.data));
  }, [tasks]);

  return (
    <div className="container">
      <AddTaskForm/>
      <TasksList tasks={tasks}/>
    </div>
  );
}

export default App;
