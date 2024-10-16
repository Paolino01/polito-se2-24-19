import { Router } from "express";
import { nextCustomerController, retriveServicesController } from "../controllers/officerController";

const officerRouter = Router();

officerRouter.post('/next-customer', nextCustomerController);
officerRouter.get('/services/:id', retriveServicesController);

export default officerRouter;