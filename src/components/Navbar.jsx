import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logo} onClick={() => navigate('/todo')}>
          <span className={styles.logoIcon}>✓</span>
          <span className={styles.logoText}>ToDo</span>
        </div>
        <div className={styles.navLinks}>
          <button 
            className={styles.navBtn}
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button 
            className={`${styles.navBtn} ${styles.navBtnPrimary}`}
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;