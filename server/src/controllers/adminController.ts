import { Request, RequestHandler, Response } from "express";
import { getInfo } from "../services/counterService";

export const retriveOfficeInfo: RequestHandler = (req, res) => {
    const office_info = getInfo();
    res.send(office_info);
    return;
}//retriveOfficeInfo

/*
export const nextCustomerController: RequestHandler = (req, res) => {
    const counterId = req.body.counter_id as CountersID;
    if (!counterId || !Object.values(CountersID).includes(counterId)) {
        res.status(400).send({ error: 'Counter ID is required and must be a valid counter' });
        return;
    }
    const customer = getNextCustomer(counterId);
    res.send(customer);
    return;
}//nextCustomerController

export const retriveServicesController: RequestHandler = (req, res) => {
    const {id} = req.query;
    if (!id || !Object.values(CountersID).includes(id)) {
        res.status(400).send({ error: 'Counter ID is required and must be a valid counter' });
        return;
    }
    const services = retriveServices(id);
    res.send(services);
    return;
}//retriveServicesController
*/