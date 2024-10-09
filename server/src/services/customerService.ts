import { getSocketIO } from "../socket";

let counter = 0;

export const getNewCustomer = (): number => {
    counter += 1;
    const message = `Ciao, customerrrrr! Numero: ${counter}`;
    const io = getSocketIO();
    const data = {
        counter,
        message
    };
    io.emit('newCustomer', data);
    return counter;
};