import { Router } from 'express';
import { homeController } from '../controllers/homeController';

const router = Router();

// Definisci una route di base
router.get('/', homeController);

export default router;