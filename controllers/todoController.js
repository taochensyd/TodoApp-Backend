const Todo = require('../models/todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Fetching todos failed!' });
  }
};

exports.createTodo = async (req, res) => {
  const { title, description } = req.body;
  try {
    const todo = new Todo({ title, description, userId: req.user.userId });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Creating todo failed!' });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const todo = await Todo.findOne({ _id: id, userId: req.user.userId });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found!' });
    }
    todo.title = title;
    todo.description = description;
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Updating todo failed!' });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found!' });
    }
    res.status(200).json({ message: 'Todo deleted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Deleting todo failed!' });
  }
};
