import express from 'express';
import http from 'http';
import path from 'path';
import { initializeSocket } from './socket';
import routes from './routes';
import { log } from './utils/logger';
import customerRoutes from './routes/customerRoutes';
import officerRoutes from './routes/officerRoutes';

// Crea un'applicazione Express
const app = express();
const server = http.createServer(app);

// Inizializza Socket.IO
initializeSocket(server);

// Serve il file index.html
//  Inserito per testare la connessione con socket.io
app.use(express.static(path.join(__dirname, 'public')));

// Utilizza le rotte definite nel file routes/index.ts
app.use('/', routes);
app.use('/customer', customerRoutes);
app.use('/officer', officerRoutes);

/* 
TODO: coming soon
app.use('/manager', managerRoutes)
app.use('/admin', adminRoutes) 
*/

// Avvia il server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    log(`Server in ascolto sulla porta ${PORT}`);
});