import { Router } from 'express';
import { homeController } from '../controllers/homeController';
import { newCustomerController } from '../controllers/customerController';
import { nextCustomerController, retriveServicesController } from '../controllers/officerController';

const router = Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); //Needed to allow requests from the client
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Definisci una route di base
router.get('/', homeController);

export default router;