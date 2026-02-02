import React from 'react'
import { useState , useEffect } from 'react';
import TodoNavbar from '../components/TodoNavbar';


function ToDoPage() {
const [username, setUsername] = useState("");

  useEffect(() => {
    // Or if stored in localStorage:
    const userData = (localStorage.getItem("username"));  //console.log('Todopage username: ',userData) //FOR DEBUGGING
    
    if (userData) {
      setUsername(userData);
    }
  },[]);

  return (
    <div>
      <TodoNavbar username={username} />
      
      
    </div>
  );
}

export default ToDoPage;
