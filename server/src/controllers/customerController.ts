import { Request, Response } from "express";
import { getNewCustomer } from "../services/customerService";


//  TODO
//  Receive a chosen service from the customer
//  Returns a ticket number
//  Returns the length of the queue for the chosen service
//  Returns the estimated waiting time (mocked with a const)
export const newCustomerController = (req: Request, res: Response) => {
    const customer = getNewCustomer(req.body.selected_service);
    res.send(customer);
};