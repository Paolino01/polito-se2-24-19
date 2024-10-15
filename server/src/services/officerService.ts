import { emit } from 'process';
import { MonitorMessage, Service, CountersID } from '../components/actors';
import { getServices } from '../dao/counterDao';
import {
  serviceWithTheHighestLength,
  getLastTicket,
  getQueuesLengths,
} from './queueService';
import { emitEvent } from './socketService';

export const getNextCustomer = async (counter_id: CountersID): Promise<string | null> => {
  let services = getServices(counter_id);
  console.log('Services: ', services);

  // DIEGO'S METHOD
  // Inputs: an array of services
  // Output: a service
  // The method returns the service of the given input which has the HIGHEST length
  // Tip: try using a "for-each" because the length of the input isn't always the same

  const longest_queue = await serviceWithTheHighestLength(services);
  console.log('Longest queue: ', longest_queue);

  if (longest_queue == null) {
    console.log('No service with a queue found');
    return 'No customer to serve';
  }

  const first_in_queue = await getLastTicket(longest_queue);
  console.log('First element in queue: ', first_in_queue);

  if (first_in_queue == null) {
    console.log('No ticket found in the queue');
    return 'No customer to serve';
  }

  let ticketToCall = first_in_queue.service + first_in_queue.id;
  console.log('Ticket', ticketToCall);

  // DIEGO'S METHOD
  // Input: a service
  // Output: the length of the queue of the input service

  const queues_length = await getQueuesLengths();
  console.log('Queues length: ', queues_length);

  const new_call = new MonitorMessage(
    ticketToCall,
    counter_id,
    queues_length,
  );
  emitEvent('nextCustomer', new_call);

  return ticketToCall;
}; // getNextCustomer

export const retriveServices = (counter_id: CountersID): string[] => {
  return getServices(counter_id);
}; //retriveServices
