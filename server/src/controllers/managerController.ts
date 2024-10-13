import { Request, Response } from "express";
import { getStats } from "../services/managerService";


//  TODO

export const managerController = (req: Request, res: Response) => {
    const stats = getStats();
    res.send(stats);
};