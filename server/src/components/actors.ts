class Customer {
    id: string
    people_waiting: number
    waiting_time: number

    constructor(id: string, people_waiting: number, waiting_time: number) {
        this.id = id;
        this.people_waiting = people_waiting;
        this.waiting_time = waiting_time
    }
}//Customer

class MonitorMessage {
    customer_id: string
    counter_id: string
    queue_people: number

    constructor(customer_id: string, counter_id: string, queue_people: number) {
        this.customer_id = customer_id;
        this.counter_id = counter_id;
        this.queue_people = queue_people
    }
}//MonitorMessage

enum Service {
    ServiceA = "A",
    ServiceB = "B",
    ServiceC = "C",
    ServiceD = "D",
}//Service

enum CountersID {
    Counter1 = "c1",
    Counter2 = "c2",
    Counter3 = "c3",
    Counter4 = "c4",
    Counter5 = "c5"
}//Service

export { Customer, MonitorMessage, Service, CountersID }