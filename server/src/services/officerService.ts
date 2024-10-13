import { emit } from "process";
import { MonitorMessage, Service, CountersID } from "../components/actors";
import { getServices } from "../dao/counterDao";
import { emitEvent } from "./socketService";

export const getNextCustomer = (counter_id: CountersID): string => {
    let services = getServices(counter_id);

    //DIEGO'S METHOD
    //Inputs: an array of services
    //Output: a service
    //The method returns the service of the given input which has the HIGHEST length
    //Tip: try using a "for-each" because the length of the input isn't always the same

    const longest_queue = Service.ServiceC; //TEMPORARY

    //DIEGO'S METHOD
    //Input: a service
    //Output: a customer id
    //The method returns the FIRST customer_id in the queue of the service given in input
    //THE METHOD CONSUME (so DELETE) THE CUSTOMER FROM THE QUEUE

    const first_in_queue = "C3"; //TEMPORARY

    //DIEGO'S METHOD
    //Input: a service
    //Output: the length of the queue of the input service

    const queue_length = 10; //TEMPORARY

    const new_call = new MonitorMessage(first_in_queue, counter_id, queue_length);
    emitEvent('nextCustomer', new_call);
    return new_call.customer_id;
}//getNewCustomer