import { Server } from 'socket.io';
import http from 'http';
import { emitEvent } from './services/socketService';
import { getQueuesLengths } from './services/queueService';

let io: Server;

export const initializeSocket = (server: http.Server): Server => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173', // Replace with your frontend's origin
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', async (socket) => {
        console.log('Un client si è connesso');

        const newQueueLengths = await getQueuesLengths();

        emitEvent('newCustomer', newQueueLengths)

        socket.on('disconnect', () => {
            console.log('Un client si è disconnesso');
        });

        // Add your event listeners here
    });

    return io;
};

export const getSocketIO = (): Server => {
    if (!io) {
        throw new Error('Socket.IO non è stato inizializzato. Chiama initializeSocket prima.');
    }
    return io;
};