import express from 'express';
import routes from './routes';
import { log } from './utils/logger';

// Crea un'applicazione Express
const app = express();

// Utilizza le rotte definite nel file routes/index.ts
app.use('/', routes);

// Avvia il server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    log(`Server in ascolto sulla porta ${PORT}`);
});