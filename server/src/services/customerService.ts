import { Customer } from "../components/actors";
import { addTicketToQueue, getLastTicketWithoutRemoving, getQueuesLengths } from "./queueService";
import { emitEvent } from "./socketService";

// Returns the new Customer
export const getNewCustomer = async (selected_service: string): Promise<Customer> => {
    //Diego's method: take as input "selected_service", returns a NUMERICAL id
    //last_numID = returnID(selected_service)
    let last_numID = await getLastTicketWithoutRemoving(selected_service);

    console.log("AAAA", last_numID);
    let new_numID: number;
    if (last_numID == null) {
        new_numID = 1;
    }
    else {
        console.log("Last_numID: ", last_numID.id);
        new_numID = last_numID.id + 1;
    }

    console.log("New_id: ", new_numID);

    let new_id: string = selected_service + new_numID;

    //Diego method
    //people_waiting = addNewCustomerToQueque(newCustomer.id, selected_service)
    //The method must add the new customer in the queue + return the number of people in it

    await addTicketToQueue(selected_service, {
        id: new_numID,
        service: selected_service,
    });



    const newQueueLengths = await getQueuesLengths();

    console.log('Queues length: ', newQueueLengths);

    let person_waiting = newQueueLengths[selected_service];
    console.log('Person waiting: ', person_waiting);

    let newCustomer = new Customer(new_id, person_waiting, '20min');

    emitEvent('newCustomer', newQueueLengths)

    return newCustomer;
}//getNewCustomer

