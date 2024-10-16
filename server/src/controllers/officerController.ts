import { Request, RequestHandler, Response } from "express";
import { getNextCustomer, retriveServices } from "../services/officerService";
import { CountersID } from "../components/actors";

//  TODO
//  Receive the id of the counter that pressed the button
//  Pull the next customer from the queue matching the service of the counter id
//  Returns the next customer
export const nextCustomerController: RequestHandler = async (req, res) => {
    const counterId = req.body.counter_id as CountersID;
    if (!counterId || !Object.values(CountersID).includes(counterId)) {
        res.status(400).send({ error: 'Counter ID is required and must be a valid counter' });
        return;
    }
    const customer = await getNextCustomer(counterId);
    console.log('Customer: ', customer);
    res.send(customer);
    return;
}//nextCustomerController

export const retriveServicesController: RequestHandler = (req, res) => {
    console.log(req.params.id);
    const id = req.params.id;
    const counterId = id as CountersID;
    if (!counterId || !Object.values(CountersID).includes(counterId)) {
        res.status(400).send({ error: 'Counter ID is required and must be a valid counter' });
        return;
    }
    const services = retriveServices(counterId);
    res.send(services);
    return;
}//retriveServicesController