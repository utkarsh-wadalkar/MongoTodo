const Todo = require('../models/todoSchema');

// GET all todos for a user
async function getTodos(req, res) {
    try {
        const userId = req.userId;
        const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
        res.status(200).send({ todos });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to fetch todos' });
    }
}

// CREATE a new todo
async function createTodo(req, res) {
    try {
        const { title, description } = req.body;
        const userId = req.userId;

        if (!title || title.trim() === '') {
            return res.status(400).send({ error: 'Title is required' });
        }

        const newTodo = new Todo({
            title: title.trim(),
            description: description?.trim() || '',
            userId
        });

        const savedTodo = await newTodo.save();
        res.status(201).send({
            message: 'Todo created successfully',
            todo: savedTodo
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to create todo' });
    }
}

// UPDATE a todo
async function updateTodo(req, res) {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const { title, description, completed } = req.body;

        // Find todo and verify ownership
        const todo = await Todo.findOne({ _id: id, userId });

        if (!todo) {
            return res.status(404).send({ error: 'Todo not found' });
        }

        // Update fields
        if (title !== undefined) todo.title = title.trim();
        if (description !== undefined) todo.description = description.trim();
        if (completed !== undefined) todo.completed = completed;

        const updatedTodo = await todo.save();
        res.status(200).send({
            message: 'Todo updated successfully',
            todo: updatedTodo
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to update todo' });
    }
}

// DELETE a todo
async function deleteTodo(req, res) {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId });

        if (!deletedTodo) {
            return res.status(404).send({ error: 'Todo not found' });
        }

        res.status(200).send({
            message: 'Todo deleted successfully',
            todo: deletedTodo
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to delete todo' });
    }
}

// TOGGLE todo completion status
async function toggleTodo(req, res) {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const todo = await Todo.findOne({ _id: id, userId });

        if (!todo) {
            return res.status(404).send({ error: 'Todo not found' });
        }

        todo.completed = !todo.completed;
        const updatedTodo = await todo.save();

        res.status(200).send({
            message: 'Todo toggled successfully',
            todo: updatedTodo
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to toggle todo' });
    }
}

const todoController = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo
};

module.exports = todoController;
