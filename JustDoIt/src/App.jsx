import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const URL = 'http://localhost:5000/tasks';
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(URL);
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  async function addTask() {
    if (newTask.trim() !== '') {
      const task = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        checked: false,
        task: newTask,
      };

      try {
        const response = await axios.post(URL, task);
        setTasks([...tasks, response.data]);
        setNewTask("");
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function deleteTask(id) {
    try {
      await axios.delete(`${URL}/${id}`);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
    } catch (error) {
      console.error(`Error deleting task: ${error.message}`);
    }
  }

  async function handleCheckboxChange(id) {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id);
      const updatedTask = { ...taskToUpdate, checked: !taskToUpdate.checked };

      const response = await axios.put(`${URL}/${id}`, updatedTask);
      const updatedTasks = tasks.map((task) =>
        task.id === id ? response.data : task
      );

      setTasks(updatedTasks);
    } catch (error) {
      console.error(`Error updating task: ${error.message}`);
    }
  }

  return (
    <div className="App">
      <h1>Just Do It!</h1>
      <div>
        <input
          type="text"
          placeholder="Write a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <input
              type="checkbox"
              checked={task.checked}
              onChange={() => handleCheckboxChange(task.id)}
            />
            <span>{task.task}</span>
            <button onClick={() => deleteTask(task.id)}>Del</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
