import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectToDatabase } from './config';
import { router as photoRoutes } from './routes';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api', photoRoutes);

connectToDatabase();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
