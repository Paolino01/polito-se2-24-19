import { Server } from 'socket.io';
import http from 'http';

let io: Server;

export const initializeSocket = (server: http.Server): Server => {
    io = new Server(server);

    io.on('connection', (socket) => {
        console.log('Un client si è connesso');
    });

    return io;
};

export const getSocketIO = (): Server => {
    if (!io) {
        throw new Error('Socket.IO non è stato inizializzato. Chiama initializeSocket prima.');
    }
    return io;
};