import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom';
import './App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ToDoPage from './toDoPage/ToDoPage';
import 'antd/dist/reset.css'
import ProtectedRoute from './services/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Redirect root path to /landing */}
      <Route path='/' element={<Navigate to='/landing' replace />} /> 
      
      <Route path='/landing' element={<Landing />} /> 
      <Route path='/login' element={<Login />} /> 
      <Route path='/register' element={<Register />} /> 
      {/* Protected Route */}
        <Route 
          path="/todo" 
          element={
            <ProtectedRoute>
              <ToDoPage />
            </ProtectedRoute>
          } 
        />

      {/* Catch all - redirect to landing */}
      <Route path='*' element={<Navigate to='/landing' replace />} />
    </Routes>
    
  )
}

export default App