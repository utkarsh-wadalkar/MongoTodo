import Navbar from '../components/Navbar';
import React, { useState } from 'react'
import styles from './Login.module.css';
import { Input, Button, message } from 'antd';
import authServices from '../services/authServices';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      // Input validation
      if (!username.trim() || !password.trim()) {
        message.error('Please fill in all fields');
        setLoading(false);
        return;
      }

      const data = { username, password }
      const response = await authServices.loginService(data);

      console.log('Login response:', response.data); // Debug log

      const { userId, token } = response.data.userdata;

      if (!token || !userId) {
        message.error('Invalid authentication');
        setLoading(false);
        return;
      }

      // Store credentials securely

      localStorage.setItem('authToken', response.data.userdata.token);//Store authentication token securely
      localStorage.setItem('userId', response.data.userdata.userId);
      localStorage.setItem('username', response.data.userdata.username);

      const expirationTime = new Date().getTime() + (24 * 60 * 60 * 1000);
      localStorage.setItem('tokenExpiration', expirationTime.toString());

      //console.log('Login response: ',response.data);//FOR DEBUGGING

      message.success(response.data.message);

      // Redirect after success message shows
      setTimeout(() => {
        navigate('/todo', { replace: true });
      }, 500);

    } catch (err) {
      console.error('Login error:', err); // Debug log
      console.error('Error response:', err.response); // Debug log
      message.error(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.login_container}>
      <Navbar />
      <div className={styles.login_card}>
        <h4>Login</h4>

        <div className={styles.input_wrapper}>
          <Input
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onPressEnter={handleLogin}
            disabled={loading}
          />
        </div>

        <div className={styles.input_wrapper}>
          <Input.Password
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onPressEnter={handleLogin}
            disabled={loading}
          />
        </div>

        <div className={styles.login_button}>
          <Button
            loading={loading}
            disabled={!username || !password}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </div>

        <div className={styles.helper_text}>
          Don't have an account? <a href="/register">Sign up</a>
        </div>
      </div>
    </div>
  )
}

export default Login