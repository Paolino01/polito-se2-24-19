import { getSocketIO } from "../socket";

export const emitEvent = (event: string, data: any) => {
    const io = getSocketIO();
    io.emit(event, data);
};