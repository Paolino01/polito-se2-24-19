import { Router } from "express";
import { nextCustomerController } from "../controllers/officerController";
import { newCustomerController } from "../controllers/customerController";

const customerRouter = Router();


customerRouter.post('/new-ticket', newCustomerController);

export default customerRouter;