import { Router } from "express";
import { nextCustomerController } from "../controllers/officerController";

const officerRouter = Router();


officerRouter.get('/next-customer', nextCustomerController);

export default officerRouter;