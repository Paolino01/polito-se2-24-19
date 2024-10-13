import { Request, RequestHandler, Response } from "express";
import { getNextCustomer } from "../services/officerService";
import { CountersID } from "../components/actors";

//  TODO
//  Receive the id of the counter that pressed the button
//  Pull the next customer from the queue matching the service of the counter id
//  Returns the next customer
export const nextCustomerController: RequestHandler = (req, res) => {
    const counterId = req.body.counter_id as CountersID;
    if (!counterId || !Object.values(CountersID).includes(counterId)) {
        res.status(400).send({ error: 'Counter ID is required and must be a valid counter' });
        return;
    }
    const customer = getNextCustomer(counterId);
    res.send(customer);
    return;
};