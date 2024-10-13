import { Router } from "express";
import { managerController } from "../controllers/managerController";

const managerRouter = Router();


managerRouter.get('/seeStats', managerController);

export default managerRouter;