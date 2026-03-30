import Customer from '../models/Customer.js';
import Task from '../models/Task.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getTasks = asyncHandler(async (req, res) => {
  const { status = 'all' } = req.query;
  const filter = { user: req.user._id };

  if (status === 'completed') {
    filter.completed = true;
  }

  if (status === 'pending') {
    filter.completed = false;
  }

  const tasks = await Task.find(filter)
    .populate('customer', 'name company status')
    .sort({ dueDate: 1, createdAt: -1 });

  res.json({
    success: true,
    count: tasks.length,
    tasks,
  });
});

export const createTask = asyncHandler(async (req, res) => {
  const { customer, title, description, dueDate } = req.body;

  if (!customer || !title || !dueDate) {
    res.status(400);
    throw new Error('Customer, title, and due date are required');
  }

  const customerRecord = await Customer.findOne({
    _id: customer,
    user: req.user._id,
  });

  if (!customerRecord) {
    res.status(404);
    throw new Error('Customer not found');
  }

  const task = await Task.create({
    user: req.user._id,
    customer,
    title,
    description,
    dueDate,
  });

  const populatedTask = await task.populate('customer', 'name company status');

  res.status(201).json({
    success: true,
    task: populatedTask,
  });
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const { title, description, dueDate, completed, customer } = req.body;

  if (customer && customer !== task.customer.toString()) {
    const customerRecord = await Customer.findOne({
      _id: customer,
      user: req.user._id,
    });

    if (!customerRecord) {
      res.status(404);
      throw new Error('Customer not found');
    }

    task.customer = customer;
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (dueDate !== undefined) task.dueDate = dueDate;
  if (completed !== undefined) task.completed = completed;

  const updatedTask = await task.save();
  const populatedTask = await updatedTask.populate('customer', 'name company status');

  res.json({
    success: true,
    task: populatedTask,
  });
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  await task.deleteOne();

  res.json({
    success: true,
    message: 'Task deleted successfully',
  });
});
