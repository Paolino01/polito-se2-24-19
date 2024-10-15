const Redis = require('ioredis');
const redis = new Redis();

async function addTicketToQueue(
  queueName: string,
  ticket: { id: number; service: string },
) {
  /**
   * Add a ticket to the specified queue
   */
  await redis.lpush(queueName, JSON.stringify(ticket));
}

async function getQueueLengths() {
  /**
   * Method to retrieve the length of all the queues
   */
  const queueNames = await redis.keys('*');
  const queueLengths: any = {};

  for (const queue of queueNames) {
    const length = await redis.llen(queue);
    queueLengths[queue] = length;
  }
  return queueLengths;
}

async function getQueueLength(queueName: any) {
  /**
   * Get the length of a queue passed as a input parameter
   */
  return await redis.llen(queueName);
}

async function getLastTicket(queueName: string) {
  /**
   * Method to retrieve (and remove) the first element in a queue
   */
  const ticket = await redis.rpop(queueName);
  return ticket ? JSON.parse(ticket) : null;
}

async function getLastTicketWithoutRemoving(queueName: string) {
  /**
   * Method to read the value of the first element in a queue
   */
  const lastElementIndex = (await redis.llen(queueName)) - 1; // get the index of the last element in the list
  const lastTicketString = await redis.lrange(
    queueName,
    lastElementIndex,
    lastElementIndex,
  ); // read the last element in the list
  return lastTicketString.length > 0 ? JSON.parse(lastTicketString[0]) : null; // return the object if exists or else null.
}

async function deleteAllQueues() {
  /**
   * This methods delete all the queues saved on Redis
   */
  const queueNames = await redis.keys('*');
  await redis.del(...queueNames);
}

async function serviceWithTheHighestLength(services: any[]) {
  /**
   * This methods receive in input an array of services and returns the service that has the highest queue
   */
  const queueLengths: any = {};

  for (const queue of services) {
    const length = await redis.llen(queue);
    queueLengths[queue] = length;
  }

  // Find the service with the highest length
  let highestLengthService = null;
  let highestLength = 0;
  for (const service in queueLengths) {
    if (queueLengths[service] > highestLength) {
      highestLengthService = service;
      highestLength = queueLengths[service];
    }
  }

  return highestLengthService;
}

async function main() {
  // Add some tickets
  await addTicketToQueue('A', {
    id: 5,
    service: 'A',
  });

  await addTicketToQueue('B', {
    id: 2,
    service: 'B',
  });

  await addTicketToQueue('A', {
    id: 8,
    service: 'A',
  });

  // Get the length of all the queues
  const queueLengths = await getQueueLengths();
  console.log('Queues length before operations:', queueLengths);

  // Read the value of the last ticket without delete it:
  const readValue = await getLastTicketWithoutRemoving('A');
  console.log("Leggiamo l'ultimo ticket del servizio A: ", readValue);

  // Get (and remove) last ticket from the queue for the service A
  const lastTicketA = await getLastTicket('A');
  console.log('Ultimo ticket:', lastTicketA);

  // Get (and remove) last ticket from the queue for the service B
  const lastTicketB = await getLastTicket('B');
  console.log('Ultimo ticket:', lastTicketB);

  // Get the length of all the queues
  const newQueueLengths = await getQueueLengths();
  console.log('Queues length after operations: ', newQueueLengths);

  // Service with the highest length
  const result = await serviceWithTheHighestLength(['A', 'B']);
  console.log('The service with the highest length is: ', result);

  // Delete all the stored queues
  await deleteAllQueues();
}

//main();
