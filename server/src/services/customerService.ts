import { getSocketIO } from "../socket";

export const getNewCustomer = (): string => {
    const message = 'Ciao, customer!';
    const io = getSocketIO();
    io.emit('newCustomer', message);
    return message;
};