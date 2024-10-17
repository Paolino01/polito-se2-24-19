import { Router } from "express";
import { retriveOfficeInfo, setCounterController } from "../controllers/adminController";

const adminRouter = Router();

adminRouter.get('/', retriveOfficeInfo);
adminRouter.post('/set-counter', setCounterController);

export default adminRouter;