import Customer from '../models/Customer.js';
import Task from '../models/Task.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getCustomers = asyncHandler(async (req, res) => {
  const { search = '', status } = req.query;
  const filter = {
    user: req.user._id,
  };

  if (status && status !== 'All') {
    filter.status = status;
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }

  const customers = await Customer.find(filter).sort({ createdAt: -1 });

  res.json({
    success: true,
    count: customers.length,
    customers,
  });
});

export const getCustomerStats = asyncHandler(async (req, res) => {
  const [totalCustomers, activeCustomers, inactiveCustomers, leadCustomers, recentCustomers, recentTasks] =
    await Promise.all([
      Customer.countDocuments({ user: req.user._id }),
      Customer.countDocuments({ user: req.user._id, status: 'Active' }),
      Customer.countDocuments({ user: req.user._id, status: 'Inactive' }),
      Customer.countDocuments({ user: req.user._id, status: 'Lead' }),
      Customer.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5),
      Task.find({ user: req.user._id }).populate('customer', 'name company').sort({ createdAt: -1 }).limit(5),
    ]);

  const recentActivity = [
    ...recentCustomers.map((customer) => ({
      type: 'customer',
      message: `Added customer ${customer.name} from ${customer.company}`,
      date: customer.createdAt,
    })),
    ...recentTasks.map((task) => ({
      type: 'task',
      message: `${task.completed ? 'Completed' : 'Created'} follow-up "${task.title}" for ${task.customer?.name || 'customer'}`,
      date: task.updatedAt,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8);

  res.json({
    success: true,
    stats: {
      totalCustomers,
      activeCustomers,
      inactiveCustomers,
      leadCustomers,
      recentActivity,
    },
  });
});

export const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, phone, company, status, notes } = req.body;

  if (!name || !email || !phone || !company) {
    res.status(400);
    throw new Error('Name, email, phone, and company are required');
  }

  const customer = await Customer.create({
    user: req.user._id,
    name,
    email,
    phone,
    company,
    status,
    notes,
  });

  res.status(201).json({
    success: true,
    customer,
  });
});

export const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!customer) {
    res.status(404);
    throw new Error('Customer not found');
  }

  const fields = ['name', 'email', 'phone', 'company', 'status', 'notes'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      customer[field] = req.body[field];
    }
  });

  const updatedCustomer = await customer.save();

  res.json({
    success: true,
    customer: updatedCustomer,
  });
});

export const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!customer) {
    res.status(404);
    throw new Error('Customer not found');
  }

  await Task.deleteMany({ customer: customer._id, user: req.user._id });
  await customer.deleteOne();

  res.json({
    success: true,
    message: 'Customer deleted successfully',
  });
});
