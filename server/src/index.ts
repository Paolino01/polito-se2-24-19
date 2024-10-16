import express from 'express';
import http from 'http';
import path from 'path';
import bodyParser from 'body-parser';
import { initializeSocket } from './socket';
import routes from './routes';
import { log } from './utils/logger';
import cors from 'cors';
import customerRoutes from './routes/customerRoutes';
import officerRoutes from './routes/officerRoutes';
import adminRoutes from './routes/adminRoutes';
import managerRoutes from './routes/managerRoutes';

// Create an Express application
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
initializeSocket(server);

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173'
}));

// Serve the index.html file
// Added to test the connection with socket.io
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes defined in routes/index.ts
app.use('/', routes);
app.use('/customer', customerRoutes);
app.use('/officer', officerRoutes);
app.use('/admin', adminRoutes);
app.use('/manager', managerRoutes);

/* 
TODO: coming soon
app.use('/manager', managerRoutes)
app.use('/admin', adminRoutes) 
*/

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    log(`Server is listening on port ${PORT}`);
});