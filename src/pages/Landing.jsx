import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from './Landing.module.css';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.landingContainer}>
      <Navbar />
      <main className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Organize Your Life with ToDo</h1>
          <p className={styles.heroSubtitle}>
            A simple and powerful task management app to help you stay productive and focused on what matters most.
          </p>
          <div className={styles.ctaButtons}>
            <button 
              className={styles.primaryBtn}
              onClick={() => navigate('/register')}
            >
              Get Started
            </button>
            <button 
              className={styles.secondaryBtn}
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>
        <div className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>✓</div>
            <h3>Easy Task Management</h3>
            <p>Create, organize, and complete tasks effortlessly</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Stay Productive</h3>
            <p>Track your progress and boost your productivity</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h3>Focus on Goals</h3>
            <p>Prioritize what matters and achieve your objectives</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;