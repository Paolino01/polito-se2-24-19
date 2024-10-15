import { Router } from "express";
import { retriveOfficeInfo } from "../controllers/adminController";

const adminRouter = Router();

adminRouter.get('/', retriveOfficeInfo);

//officerRouter.get('/temporary-path/:id', retriveServicesController );
//officerRouter.post('/next-customer', nextCustomerController);

export default adminRouter;