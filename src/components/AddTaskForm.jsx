import { useState } from "react";
import axios from "../services/axios";
import Loader from "./Loader";

const AddTaskForm = () => {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const addTask = async (event) => {
    event.preventDefault();
    const data = {
      name, priority: Number(priority), isDone: false
    }
    try {
      setIsLoading(true);
      const res = await axios.post('/task/create', data);
      setName('');
      setPriority(1);
      console.log(res);
    } catch (error) {
      console.log(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {
        isLoading && <Loader/>
      }
      <div className="form-wrapper">
        <h2 className="title">Create a new task</h2>
        <form className="form" onSubmit={(e) => addTask(e)}>
          <div className="form-part">
            <input type="text" className="form-input" placeholder="Name of task..." onChange={(e) => setName(e.target.value)}/>
            <select className="form-select" onChange={(e) => setPriority(+e.target.value)}>
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </select>
          </div>
          <div className="form-part">
            <input type="submit" value="Add task" className="form-submit"/>
          </div>
        </form>
      </div>
    </>
    
  )
}

export default AddTaskForm;