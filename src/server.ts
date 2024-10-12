import express from 'express';
import bodyParser from 'body-parser';
import apiRoutes from './routes/apiRoutes';

function createServer() {
    const app = express();

    app.use(bodyParser.json());

    app.use('/api', apiRoutes);

    return app;
}

export default createServer;