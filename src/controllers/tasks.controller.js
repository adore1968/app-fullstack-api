import Task from "../database/models/Task.js";

export const getTasksController = async (req, res) => {
  try {
    const { id } = req.user;
    const tasksFound = await Task.find({ user: id }, { __v: 0 });
    if (tasksFound.length === 0) {
      return res.status(404).json({ message: "No tasks" });
    }
    res.json(tasksFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const taskFound = await Task.findById(id, { __v: 0 });
    if (!taskFound) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({
      id: taskFound._id,
      title: taskFound.title,
      description: taskFound.description,
      date: taskFound.date,
      user: taskFound.user,
      createdAt: taskFound.createdAt,
      updatedAt: taskFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTaskController = async (req, res) => {
  try {
    const { id } = req.user;
    const { title, description, date } = req.body;
    const newTask = new Task({ title, description, date, user: id });
    const taskSaved = await newTask.save();
    res.status(201).json({
      id: taskSaved._id,
      title: taskSaved.title,
      description: taskSaved.description,
      user: taskSaved.user,
      createdAt: taskSaved.createdAt,
      updatedAt: taskSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const newTask = req.body;
    const updatedTask = await Task.findByIdAndUpdate(id, newTask, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({
      id: updatedTask._id,
      title: updatedTask.title,
      description: updatedTask.description,
      user: updatedTask.user,
      createdAt: updatedTask.createdAt,
      updatedAt: updatedTask.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTaskController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({
      id: deletedTask._id,
      title: deletedTask.title,
      description: deletedTask.description,
      user: deletedTask.user,
      createdAt: deletedTask.createdAt,
      updatedAt: deletedTask.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
