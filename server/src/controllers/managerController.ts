import { Request, Response } from "express";
import { getStats } from "../services/managerService";


//  TODO
//  Returns stats for manager based on serviceType and counter
export const managerController = async (req: Request, res: Response) => {
    const { type } = req.query;  

    try {
        const stats = await getStats(type as string); 
        res.send(stats);  
    } catch (error) {
        res.status(500).send({ message: error }); 
    }
};