import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../services/axios";
import { useState } from "react";

const PROIRITIES = ['High', 'Medium', 'Low'];

const TasksItem = ({ task }) => {
  const [name, setName] = useState(task.name);
  const [priority, setPriority] = useState(+task.priority);
  const [isEditable, setIsEditable] = useState(false);
  const [isDone, setIsDone] = useState(!!task.isDone);

  const updateTask = async (e) => {
    e.preventDefault()
    const data = {
      name, priority, isDone
    }
    try {
      await axios.patch(`/task/update/${task._id}`, data);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteTask = async (e) => {
    e.preventDefault()
    try {
      await axios.delete(`/task/delete/${task._id}`);
    } catch (error) {
      console.log(error);
    }
  } 

  return (
    <div className={isDone ? "tasks-item tasks-item__checked" : "tasks-item" }>
      <div className="tasks-item__part">
        <input type="checkbox" name="" id="" checked={isDone} onClick={() => setIsDone(!isDone)} className="tasks-item__checkbox" />
        <div className="tasks-item__info">
          {
            isEditable ? <input type="text" value={name} className="tasks-item__input" onChange={(e) => setName(e.target.value)} /> 
            : <h4 className="tasks-item__name">{name}</h4>
          }
          {
            isEditable ? (
              <select className="tasks-item__select" onChange={(e) => setPriority(+e.target.value)} value={priority}>
                <option value="1" className="high">High</option>
                <option value="2" className="medium">Medium</option>
                <option value="3" className="low">Low</option>
              </select>
            ) :
            <h6 className={`tasks-item__priority ${PROIRITIES[priority - 1].toLocaleLowerCase()}`}>Priority: {PROIRITIES[priority - 1]}</h6>
          }
        </div>
      </div>
      <div className="tasks-item__part">
        {
          isEditable ? (
            <button className="tasks-item__btn tasks-item__btn-submit" onClick={(e) => { 
              setIsEditable(false);
              updateTask(e);
            }}>
              <FontAwesomeIcon icon={faCheck}/>
            </button>
          ) : (
            <button className="tasks-item__btn tasks-item__btn-edit" onClick={() => setIsEditable(true)}>
              <FontAwesomeIcon icon={faEdit}/>
            </button>
          )
        }
        <button className="tasks-item__btn tasks-item__btn-delete" onClick={(e) => deleteTask(e)}>
          <FontAwesomeIcon icon={faTrash}/>
        </button>
      </div>
    </div>
  );
}

export default TasksItem;