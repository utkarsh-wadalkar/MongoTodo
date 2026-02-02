import Navbar from '../components/Navbar';
import React, { useState } from 'react'
import styles from './Register.module.css';
import { Input, Button, message } from 'antd';
import authServices from '../services/authServices';
import { useNavigate } from 'react-router';

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleRegister = async () => {
    if (!name || !username || !password) {
      message.error("Please fill in all fields");
      return;
    }
    
    try {
      setLoading(true);
      let data ={
        name,
        username,
        password
      }
      
      const response = await authServices.registerService(data);
      //console.log(response.data);
      message.success(response.data.message);
// Redirect to login page
      navigate('/login');
    } catch (error) {
      message.error(error.response.data.message || "Registration failed");

    } finally {
      setLoading(false);

    }
  };
  
  return (
    <div className={styles.register_container}>
      <Navbar />
      <div className={styles.register_card}>
        <h4>Register</h4>
        
        <div className={styles.input_wrapper}>
          <Input 
            placeholder='Full Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.input_wrapper}>
          <Input 
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.input_wrapper}>
          <Input.Password 
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.register_button}>
          <Button onClick={handleRegister} loading={loading}>
            Create Account
          </Button>
        </div>

        <div className={styles.helper_text}>
          Already have an account? <a href="/login">Sign In</a>
        </div>
      </div>
    </div>
  )
}

export default Register