import { Request, RequestHandler, Response } from "express";
import { getInfo, pushServices } from "../services/counterService";

export const retriveOfficeInfo: RequestHandler = (req, res) => {
    const office_info = getInfo();
    res.send(office_info);
    return;
}//retriveOfficeInfo

export const setCounterController: RequestHandler = (req, res) => {
    const service_selection = req.body;

    try {
        Object.keys(service_selection).forEach(counter => {
            pushServices(counter, service_selection[counter]);
        });

        res.json(true); // Return true on success
    } catch (error) {
        console.error('Error setting counter:', error);
        res.status(500).json(false); // Return false on error
    }
};//setCounterServices