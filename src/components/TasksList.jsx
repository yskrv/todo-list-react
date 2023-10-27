import TasksItem from "./TasksItem";

const TasksList = ({ tasks }) => {
  return (
    <div className="tasks">
      <h2 className="title">Tasks</h2>
      {
        tasks.map(task => (
          <TasksItem task={task}/>
        ))
      }
    </div>
  );
}

export default TasksList;