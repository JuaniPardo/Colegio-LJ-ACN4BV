import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/routes';

const API_PORT = process.env.PORT ?? 3000;
const app = express();

// EXPRESS APP USAGES 
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// EXPRESS APP USE ROUTES
app.use('/', router)

app.listen(API_PORT, () => {
    console.log(`API Listening on port: ${API_PORT}`);
})