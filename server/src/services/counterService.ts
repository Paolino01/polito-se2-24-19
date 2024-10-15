import { emit } from "process";
import { MonitorMessage, Service, CountersID } from "../components/actors";
import { emitEvent } from "./socketService";

// This method retrieves all the counter ids and all the services available in the office
export const getInfo = (): any => {
    const services = Object.values(Service);
    const counters = Object.values(CountersID);

    return {
        services,
        counters
    };
};//getInfo