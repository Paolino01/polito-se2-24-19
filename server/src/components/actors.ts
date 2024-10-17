class Customer {
    id: string
    people_waiting: number
    waiting_time: string

    constructor(id: string, people_waiting: number, waiting_time: string) {
        this.id = id;
        this.people_waiting = people_waiting;
        this.waiting_time = waiting_time
    }
}//Customer

class MonitorMessage {
    customer_id: string
    counter_id: string
    //queues_people: any

    constructor(customer_id: string, counter_id: string, queues_people: any) {
        this.customer_id = customer_id;
        this.counter_id = counter_id;
        //this.queues_people = queues_people
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