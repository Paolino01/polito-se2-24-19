import { Router } from "express";
import { nextCustomerController, retriveServicesController } from "../controllers/officerController";

const officerRouter = Router();

officerRouter.post('/next-customer', nextCustomerController);
officerRouter.post('/services', retriveServicesController);

export default officerRouter;