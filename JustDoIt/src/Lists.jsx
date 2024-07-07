import React, { useState, useContext } from "react"
import axios from "axios"
import { UserContext } from "./UserContext"

function Lists() {
  const { user, setUser } = useContext(UserContext)
  const [tasks, setTasks] = useState(user.tasks)
  const [newTask, setNewTask] = useState("")

  const handleInputChange = (event) => {
    setNewTask(event.target.value)
  }

  const addTask = async () => {
    if (newTask.trim() !== '') {
      const task = {
        id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
        checked: false,
        task: newTask,
      }

      const updatedUser = { ...user, tasks: [...tasks, task] }
      try {
        await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser)
        setTasks(updatedUser.tasks)
        setNewTask("")
        setUser(updatedUser)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const deleteTask = async (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    const updatedUser = { ...user, tasks: updatedTasks }
    try {
      await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser)
      setTasks(updatedTasks)
      setUser(updatedUser)
    } catch (error) {
      console.error(`Error deleting task: ${error.message}`)
    }
  }

  const handleCheckboxChange = async (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, checked: !task.checked } : task
    )
    const updatedUser = { ...user, tasks: updatedTasks }
    try {
      await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser)
      setTasks(updatedTasks)
      setUser(updatedUser)
    } catch (error) {
      console.error(`Error updating task: ${error.message}`)
    }
  }

  return (
    <div className="testy justify-center">
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
          {tasks.map(task => (
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

export default Lists;
