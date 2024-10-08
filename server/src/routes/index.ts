import { Router } from 'express';
import { homeController } from '../controllers/homeController';
import { newCustomerController } from '../controllers/customerController';
import { nextCustomerController } from '../controllers/officerController';

const router = Router();

// Definisci una route di base
router.get('/', homeController);

export default router;