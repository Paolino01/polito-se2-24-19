import { emit } from 'process';
import { MonitorMessage, Service, CountersID } from '../components/actors';
import { getServices } from '../dao/counterDao';
import {
  serviceWithTheHighestLength,
  getLastTicket,
  getQueuesLengths,
} from './queueService';
import { emitEvent } from './socketService';

export const getNextCustomer = async (
  counter_id: CountersID,
): Promise<string> => {
  let services = getServices(counter_id);

  //DIEGO'S METHOD
  //Inputs: an array of services
  //Output: a service
  //The method returns the service of the given input which has the HIGHEST length
  //Tip: try using a "for-each" because the length of the input isn't always the same

  const first_in_queue = serviceWithTheHighestLength(services).then(
    (longest_queue) => {
      console.log('Siamo nel then: ', longest_queue);
      if (longest_queue != null) {
        console.log(longest_queue);
        return getLastTicket(longest_queue);
      } else {
        console.log('è nullo');
        return null;
      }
    },
  );

  console.log('First element in queue: ', first_in_queue);

  //const longest_queue = Service.ServiceC; //TEMPORARY

  //DIEGO'S METHOD
  //Input: a service
  //Output: a customer id
  //The method returns the FIRST customer_id in the queue of the service given in input
  //THE METHOD CONSUME (so DELETE) THE CUSTOMER FROM THE QUEUE

  //const first_in_queue = "C3"; //TEMPORARY

  //DIEGO'S METHOD
  //Input: a service
  //Output: the length of the queue of the input service

  const queues_length = getQueuesLengths();

  // const queues_length = {
  //     "A": 10,
  //     "B": 5,
  //     "C": 20,
  // }

  //TEMPORARY

  const new_call = new MonitorMessage(
    await first_in_queue,
    counter_id,
    queues_length,
  );
  emitEvent('nextCustomer', new_call);
  return new_call.customer_id;
}; //getNewCustomer

export const retriveServices = (counter_id: CountersID): string[] => {
  return getServices(counter_id);
}; //retriveServices
