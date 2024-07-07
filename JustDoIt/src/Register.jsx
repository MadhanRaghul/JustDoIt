import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
    const [data, setData] = useState({
        name: '',
        pass: ''
    })
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/users', { ...data, tasks: [] })
        .then(() => {
            alert("Registered successfully!")
            navigate('/login')
        })
        .catch(error => console.error(error))
    }

    return (
        <div className='Register flex flex-col justify-center items-center m-2'>
            <h1 className="text-3xl font-bold mb-4">Create your account</h1>
            <form className='flex flex-col p-2 m-2 gap-4 w-80' onSubmit={handleSubmit}>
                <input 
                    className="p-2 rounded border border-gray-300"
                    type="text"
                    placeholder='Name...'
                    required
                    onChange={(e) => setData({...data, name: e.target.value})} />
                <input 
                    className="p-2 rounded border border-gray-300"
                    type="password"
                    placeholder='Password...'
                    required
                    onChange={(e) => setData({...data, pass: e.target.value})}  />
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">Register</button>
            </form>
            <p>Already a User?</p> <Link className=' text-blue-500' to="/login">Login</Link>
        </div>
    )
}

export default Register;
