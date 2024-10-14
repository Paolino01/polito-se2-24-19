import { Request, Response, RequestHandler } from "express";
import { getNewCustomer } from "../services/customerService";
import { Service } from "../components/actors";

//  TODO
//  Receive a chosen service from the customer
//  Returns a ticket number
//  Returns the length of the queue for the chosen service
//  Returns the estimated waiting time (mocked with a const)
export const newCustomerController: RequestHandler = (req, res) => {
    const selectedService = req.body.selected_service as Service;
    if (!selectedService || !Object.values(Service).includes(selectedService)) {
        res.status(400).send({ error: 'Selected service is required and must be a valid service' });
        return;
    }
    const customer = getNewCustomer(selectedService);
    res.send(customer);
    return;
};