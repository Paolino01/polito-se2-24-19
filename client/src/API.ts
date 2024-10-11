const SERVER_URL = 'http://localhost:3001/askBackendTeam';

/**
 * 
 * @param counterId the ID of the counter
 * @returns the services provided by this counter
 */
const getCounterInformation = async (counterId: number) => {
    const response = await fetch(SERVER_URL + "/counters/" + counterId, {
        method: 'GET',
        credentials: 'include'
    });
    if(response.ok) {
        return response.json();
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
const markAsServed = async(counterId: number) => {
    const response = await fetch(SERVER_URL + "/markAsServed/", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ counterId: counterId })
    });

    if(response.ok) {
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
    const response = await fetch(SERVER_URL + "/nextCustomer/" + counterId, {
        method: 'GET',
        credentials: 'include'
    });
    if(response.ok) {
        return response.json();
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

const API = {getCounterInformation, markAsServed, nextCustomer};
export default API;