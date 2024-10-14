import { Customer } from "../components/actors";
import { emitEvent } from "./socketService";

// Returns the new Customer
export const getNewCustomer = (selected_service: string): Customer => {
    //Diego's method: take as input "selected_service", returns a NUMERICAL id
    //last_numID = returnID(selected_service)
    let last_numID = 1; //TEMPORARY!!

    let new_numID = last_numID + 1;
    let new_id: string = selected_service + new_numID;

    //Diego method
    //people_waiting = addNewCustomerToQueque(newCustomer.id, selected_service)
    //The method must add the new customer in the queue + return the number of people in it

    //"100" is the temporary waiting time value
    //"5" is the temporary number of people in queue
    let newCustomer = new Customer(new_id, 5, 100);

    emitEvent('newCustomer', newCustomer)
    //"emitEvent" is used to notify the monitor, soon it will be used!

    return newCustomer;
}//getNewCustomer

