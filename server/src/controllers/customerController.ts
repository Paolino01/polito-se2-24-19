import { getNewCustomer } from "../services/customerService";
import { Request, Response } from "express";



export const newCustomerController = (req: Request, res: Response) => {
    const customer = getNewCustomer();
    res.send(customer);
};