import { Router } from "express";
import { managerController } from "../controllers/managerController";

const managerRouter = Router();


managerRouter.post('/seeStats', managerController);

export default managerRouter;