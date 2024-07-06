import React, { useEffect, useState } from "react"
import axios from "axios"

function App() {
  const URL = 'http://localhost:5000/tasks'
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(URL)
        setTasks(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchTasks()
  }, [])

  function handleInputChange(event) {
    setNewTask(event.target.value)
  }

  async function addTask() {
    if (newTask.trim() !== '') {
      const task = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        checked: false,
        task: newTask,
      }

      try {
        const response = await axios.post(URL, task)
        setTasks([...tasks, response.data])
        setNewTask("")
      } catch (error) {
        console.error(error)
      }
    }
  }

  async function deleteTask(id) {
    try {
      await axios.delete(`${URL}/${id}`)
      const updatedTasks = tasks.filter((task) => task.id !== id)
      setTasks(updatedTasks)
    } catch (error) {
      console.error(`Error deleting task: ${error.message}`)
    }
  }

  async function handleCheckboxChange(id) {
    try {
      const taskToUpdate = tasks.find((task) => task.id === id)
      const updatedTask = { ...taskToUpdate, checked: !taskToUpdate.checked }

      const response = await axios.put(`${URL}/${id}`, updatedTask)
      const updatedTasks = tasks.map((task) =>
        task.id === id ? response.data : task
      )

      setTasks(updatedTasks)
    } catch (error) {
      console.error(`Error updating task: ${error.message}`)
    }
  }

  return (
    <div className="testy max-h justify-center relative">
      <img src="/assets/rkaindrop.gif" alt="" className=" yes absolute inset-0 z-0 blur-sm" />
      <div className="box p-5 mt-5 w-max rounded-2xl flex flex-col justify-center items-center relative z-10">
        <h1 className="text-3xl font-bold mb-4">Just Do It!</h1>
        <div className="mb-4">
          <input
            className="p-2 w-64 rounded mr-2"
            type="text"
            placeholder="Write a task..."
            maxLength={25}
            value={newTask}
            onChange={handleInputChange}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded opacity-90" onClick={addTask}>Add</button>
        </div>
        <div className="w-80">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center mb-2 border-solid border-2 border-opacity-20 border-gray-100 rounded p-1 shadow-xl">
              <input
                className="transform -translate-x-2.5 scale-150 opacity-70"
                type="checkbox"
                checked={task.checked}
                onChange={() => handleCheckboxChange(task.id)}
              />
              <span id="the-task" className={task.checked ? 'line-through' : ''}>
                {task.task}
              </span>
              <button className="ml-2 bg-red-500 opacity-90 text-white px-4 py-1 rounded" onClick={() => deleteTask(task.id)}>X</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
