import { Request, Response } from "express";
import { getStats } from "../services/managerService";

// Returns stats for manager based on serviceType and reportType (daily, weekly, monthly)
export const managerController = async (req: Request, res: Response) => {
    const { type, reportType } = req.query;  // Get 'type' and 'reportType' from the query params

    try {
        const stats = await getStats(type as string, reportType as string);  
        res.send(stats);
    } catch (error) {
        res.status(500).send({ message: error }); 
    }
};