import { CountersID, Service } from "../components/actors";

// Define the services offered by each counter
const counterServices: Record<CountersID, Service[]> = {
    [CountersID.Counter1]: [Service.ServiceA, Service.ServiceB, Service.ServiceC],
    [CountersID.Counter2]: [Service.ServiceB, Service.ServiceC],
    [CountersID.Counter3]: [Service.ServiceC],
    [CountersID.Counter4]: [Service.ServiceB, Service.ServiceD],
    [CountersID.Counter5]: [Service.ServiceC, Service.ServiceD]
};

// Function to get services offered by a specific counter
export const getServices = (counterId: CountersID): Service[] => {
    return counterServices[counterId] || [];
};