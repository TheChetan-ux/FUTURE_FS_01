import express from 'express';

import {
  createCustomer,
  deleteCustomer,
  getCustomers,
  getCustomerStats,
  updateCustomer,
} from '../controllers/customerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getCustomers);
router.get('/stats', getCustomerStats);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
