import express from 'express';
import bodyParser from 'body-parser';
import justifyRoutes from './routes/justifyRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/justify', justifyRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});