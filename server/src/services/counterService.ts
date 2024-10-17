import { emit } from "process";
import { MonitorMessage, Service, CountersID } from "../components/actors";
import { emitEvent } from "./socketService";
import { counterServices } from "../dao/counterDao";

// This method retrieves all the counter ids and all the services available in the office
export const getInfo = (): any => {
    const services = Object.values(Service);
    const counters = Object.values(CountersID);

    return {
        services,
        counters
    };
};//getInfo

export const pushServices = (counter_id: string, selected_services: any): boolean => {
    (Object.keys(counterServices) as Array<keyof typeof counterServices>).forEach(counter => {
        if (counter_id === counter) {
            counterServices[counter] = selected_services;
        }
    });
    return true;
};//pushServices