import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TodoNavbar.module.css';
import { message } from 'antd';
const TodoNavbar = ({ username }) => {
  const navigate = useNavigate();

const handleLogout = () => {
    
  try {
    ["authToken", "tokenExpiration", "userId", "username"].forEach(key => localStorage.removeItem(key));

    message.success("Logout successful");
    navigate("/landing");
  } catch (error) {
    message.error("Logout failed");
    }
};
 
  
  //console.log('Navbar username:', username);// FOR DEBUGGING
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo} onClick={() => navigate('/')}>
            <span className={styles.logoIcon}>✓</span>
            <span className={styles.logoText}>ToDo</span>
        </div>
        
        <div className={styles.username}>
          <span>{username}</span>
        </div>
        
        <div className={styles.navLinks}>
          <button 
            className={styles.logoutBtn}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TodoNavbar;