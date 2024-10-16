import { CounterSet } from "./utils/interfaces";

const SERVER_URL = 'http://localhost:3000';

/**
 * 
 * @param counterId the ID of the counter
 * @returns the services provided by this counter
 */
const getCounterInformation = async (counterId: number) => {
    const response = await fetch(SERVER_URL + "/officer/temporary-path/" + counterId, {
        method: 'GET'
    });
    if (response.ok) {
        const services = await response.text();
        console.log(services);
        return services;
    }
    else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message

        throw new Error("Error retreiving Counter information");
    }
}

/**
 * 
 * @param counterId the ID of the counter
 * @returns nothing
 */
const markAsServed = async (counterId: number) => {
    const response = await fetch(SERVER_URL + "/officer/markAsServed/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ counter_id: counterId })
    });

    if (response.ok) {
        return;
    }
    else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message

        throw new Error("Error saving served customer");
    }
}

/**
 * 
 * @param counterId the ID of the counter
 * @returns the ID of the next customer that needs to be served
 */
const nextCustomer = async (counterId: number) => {
    const response = await fetch(SERVER_URL + "/officer/next-customer/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ counter_id: counterId })
    });
    if (response.ok) {
        const customer_id = await response.text();
        return customer_id;
    }
    else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message

        throw new Error("Error retreiving next customer");
    }
}


//Monitor
const getCounterNumbers = async () => {
    const response = await fetch(SERVER_URL + "/monitor/getCounterNumbers/", {
        method: 'GET',
        credentials: 'include'
    });
    if (response.ok) {
        return response.json();
    }
    else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message

        throw new Error("Error retreiving counter numbers");
    }
}


export const fetchAdminData = async (): Promise<CounterSet> => {
    const response = await fetch(SERVER_URL + '/admin');
    console.log(response)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const saveAssociations = async (associations: Record<string, string[]>): Promise<boolean> => {
    const response = await fetch(`${SERVER_URL}/admin/set-counter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(associations),
    });

    if (!response.ok) {
        return false;
    }

    return true;
};

const API = { getCounterInformation, markAsServed, nextCustomer, getCounterNumbers };
export default API;
