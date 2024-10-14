import { Request, Response } from "express";
import { getNextCustomer } from "../services/officerService";

export const nextCustomerController = (req: Request, res: Response) => {
    const customer = getNextCustomer();
    res.send(customer);
};