import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext'

const Login = () => {
    const [data, setData] = useState({
        name: '',
        pass: ''
    })
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get('http://localhost:5000/users')
        .then(result => {
            const user = result.data.find(user => user.name === data.name && user.pass === data.pass)
            if (user) {
                alert('Login successfully!')
                setUser(user)
                navigate('/lists')
            } else {
                alert('Username or password does not match')
            }
        })
        .catch(error => console.error(error))
    }

    return (
        <div className='Login flex flex-col justify-center items-center m-2'>
            <h1 className='text-3xl font-bold mb-4'>Login to your account</h1>
            <form className='flex flex-col p-2 m-2 gap-4 w-80' onSubmit={handleSubmit}>
                <input 
                    className="p-2 rounded border border-gray-300"
                    type="text"
                    placeholder='Name...'
                    required
                    onChange={(e) => setData({ ...data, name: e.target.value })} />
                <input 
                    className="p-2 rounded border border-gray-300"
                    type="password"
                    placeholder='Password...'
                    required
                    onChange={(e) => setData({ ...data, pass: e.target.value })} />
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
