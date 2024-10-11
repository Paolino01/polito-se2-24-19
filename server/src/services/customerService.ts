import { emitEvent } from "./socketService";


let counter = 0;

export const getNewCustomer = (): number => {
    counter += 1;
    const message = `Ciao, customerrrrr! Numero: ${counter}`;
    const data = {
        counter,
        message
    };
    emitEvent('newCustomer', data)
    return counter;
};