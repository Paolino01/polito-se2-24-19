import { Request, Response } from "express";
import { getNextCustomer } from "../services/officerService";


//  TODO
//  Receive the id of the counter that pressed the button
//  Pull the next customer from the queue matching the service of the counter id
//  Returns the next customer
export const nextCustomerController = (req: Request, res: Response) => {
    const customer = getNextCustomer();
    res.send(customer);
};