import express,{Request, Response} from 'express';
import {envs} from './config/envs';
import { mongo } from 'mongoose';
import { MongoDatabase } from './data/init';
import { IncidentModel } from './data/models/incident.model';

const app = express();

app.use(express.json());

console.log(envs.PORT);

(async () =>
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB
    }))
();

app.get('/', async (req:Request, res:Response) => {
    try {
        const incidents = await IncidentModel.find();
        res.json(incidents);
    } catch (error) {

    }
});

app.post('/', async (req:Request, res:Response) => {
    try {
        const {title, description, lat, lng} = req.body;
        const newIncident = IncidentModel.create({
            title, description, lat, lng});

        return res.json(newIncident);
    }
    catch (error) {

    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});