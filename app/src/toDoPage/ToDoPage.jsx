import React, { useState, useEffect, useCallback } from 'react';
import TodoNavbar from '../components/TodoNavbar';
import styles from './ToDoPage.module.css';
import { message } from 'antd';
import axios from 'axios';

function ToDoPage() {
  const [username, setUsername] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [editingTodo, setEditingTodo] = useState(null);
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const API_URL = 'https://mongotodo-9k7x.onrender.com';

  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/todos`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      message.error('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    const userData = localStorage.getItem("username");
    if (userData) {
      setUsername(userData);
    }
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.title.trim()) {
      message.warning('Please enter a title');
      return;
    }

    try {
      const token = getAuthToken();
      const response = await axios.post(
        `${API_URL}/todos`,
        newTodo,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos([response.data.todo, ...todos]);
      setNewTodo({ title: '', description: '' });
      setIsAddingTodo(false);
      console.log(response);
      message.success('Todo added successfully');
    } catch (error) {
      console.log(error);
      console.error('Error adding todo:', error);
      message.error('Failed to add todo');
    }
  };

  const handleUpdateTodo = async (id, updates) => {
    try {
      const token = getAuthToken();
      const response = await axios.put(
        `${API_URL}/todos/${id}`,
        updates,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map(todo => todo._id === id ? response.data.todo : todo));
      setEditingTodo(null);
      message.success('Todo updated successfully');
    } catch (error) {
      console.error('Error updating todo:', error);
      message.error('Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const token = getAuthToken();
      await axios.delete(`${API_URL}/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTodos(todos.filter(todo => todo._id !== id));
      message.success('Todo deleted successfully');
    } catch (error) {
      console.error('Error deleting todo:', error);
      message.error('Failed to delete todo');
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const token = getAuthToken();
      const response = await axios.patch(
        `${API_URL}/todos/${id}/toggle`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map(todo => todo._id === id ? response.data.todo : todo));
    } catch (error) {
      console.error('Error toggling todo:', error);
      message.error('Failed to toggle todo');
    }
  };

  const startEdit = (todo) => {
    setEditingTodo({ ...todo });
  };

  const cancelEdit = () => {
    setEditingTodo(null);
  };

  const saveEdit = () => {
    if (!editingTodo.title.trim()) {
      message.warning('Title cannot be empty');
      return;
    }
    handleUpdateTodo(editingTodo._id, {
      title: editingTodo.title,
      description: editingTodo.description
    });
  };

  return (
    <div className={styles.pageContainer}>
      <TodoNavbar username={username} />

      <div className={styles.contentWrapper}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>My Tasks</h1>
            <button
              className={styles.addButton}
              onClick={() => setIsAddingTodo(!isAddingTodo)}
            >
              {isAddingTodo ? '✕ Cancel' : '+ Add Task'}
            </button>
          </div>

          {isAddingTodo && (
            <form onSubmit={handleAddTodo} className={styles.addTodoForm}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  placeholder="Task title..."
                  value={newTodo.title}
                  onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                  className={styles.input}
                  autoFocus
                />
                <textarea
                  placeholder="Description (optional)..."
                  value={newTodo.description}
                  onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                  className={styles.textarea}
                  rows="3"
                />
              </div>
              <button type="submit" className={styles.submitButton}>
                Add Task
              </button>
            </form>
          )}

          {loading ? (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Loading tasks...</p>
            </div>
          ) : todos.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📝</div>
              <h2>No tasks yet</h2>
              <p>Create your first task to get started!</p>
            </div>
          ) : (
            <div className={styles.todoList}>
              {todos.map((todo) => (
                <div
                  key={todo._id}
                  className={`${styles.todoCard} ${todo.completed ? styles.completed : ''}`}
                >
                  {editingTodo && editingTodo._id === todo._id ? (
                    <div className={styles.editForm}>
                      <input
                        type="text"
                        value={editingTodo.title}
                        onChange={(e) => setEditingTodo({ ...editingTodo, title: e.target.value })}
                        className={styles.editInput}
                      />
                      <textarea
                        value={editingTodo.description}
                        onChange={(e) => setEditingTodo({ ...editingTodo, description: e.target.value })}
                        className={styles.editTextarea}
                        rows="2"
                      />
                      <div className={styles.editActions}>
                        <button onClick={saveEdit} className={styles.saveButton}>
                          Save
                        </button>
                        <button onClick={cancelEdit} className={styles.cancelButton}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={styles.todoContent}>
                        <div className={styles.checkboxWrapper}>
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleTodo(todo._id)}
                            className={styles.checkbox}
                            id={`todo-${todo._id}`}
                          />
                          <label htmlFor={`todo-${todo._id}`} className={styles.checkboxLabel}></label>
                        </div>
                        <div className={styles.todoText}>
                          <h3 className={styles.todoTitle}>{todo.title}</h3>
                          {todo.description && (
                            <p className={styles.todoDescription}>{todo.description}</p>
                          )}
                          <span className={styles.todoDate}>
                            {new Date(todo.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                      <div className={styles.todoActions}>
                        <button
                          onClick={() => startEdit(todo)}
                          className={styles.editButton}
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDeleteTodo(todo._id)}
                          className={styles.deleteButton}
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToDoPage;
