const express = require('express');
const router = express.Router();
const todoController = require('../controller/todoController');
const authMiddleware = require('../middleware/authMiddleware');

// All todo routes require authentication
router.get('/todos', authMiddleware, todoController.getTodos);
router.post('/todos', authMiddleware, todoController.createTodo);
router.put('/todos/:id', authMiddleware, todoController.updateTodo);
router.delete('/todos/:id', authMiddleware, todoController.deleteTodo);
router.patch('/todos/:id/toggle', authMiddleware, todoController.toggleTodo);

module.exports = router;
