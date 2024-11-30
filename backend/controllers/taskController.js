const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  const { title, description, deadline, priority } = req.body;
  try {
    const task = await Task.create({ user: req.user, title, description, deadline, priority });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTasks, createTask };
