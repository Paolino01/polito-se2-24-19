import { Customer } from "../components/actors";
import { emitEvent } from "./socketService";

// Returns the new Customer
export const getNewCustomer = (selected_service: string): Customer => {
    //Diego's method: take as input "selected_service", returns a NUMERICAL id
    //last_numID = returnID(selected_service)
    let last_numID = 1; //TEMPORARY!!

    let new_numID = last_numID + 1;
    let new_id: string = selected_service + new_numID;

    //"100" is the temporary waiting time value
    let newCustomer = new Customer(new_id, 100);

    //Diego method
    //addNewCustomerToQueque(newCustomer.id, selected_service)

    //emitEvent('newCustomer', quantity_queue)
    //"emitEvent" is used to notify the monitor, soon it will be used!
    //"quantity_queue" is the updated number of customers in queue, it is returned by a Diego's method

    return newCustomer;
}//getNewCustomer

