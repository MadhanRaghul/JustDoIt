import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Lists from './Lists'
import { UserProvider } from './UserContext'

const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('user')
    return user ? children : <Navigate to="/" />
};

const App = () => {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/lists"
                        element={
                            <ProtectedRoute>
                                <Lists />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    )
}

export default App;
