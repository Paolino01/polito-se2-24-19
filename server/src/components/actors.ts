class Customer {
    id: string
    waiting_time: number

    constructor(id: string, waiting_time: number) {
        this.id = id;
        this.waiting_time = waiting_time
    }
}//Customer

enum Service {
    ServiceA = "A",
    ServiceB = "B",
    ServiceC = "C",
    ServiceD = "D",
}//Service

export { Customer, Service }