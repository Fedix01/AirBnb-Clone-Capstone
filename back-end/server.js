import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { userApiRoute } from './services/routes/user.route.js';
import { insertionApiRoute } from './services/routes/insertion.route.js';

config();

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());


app.use("/api/user", userApiRoute);
app.use("/api/insertion", insertionApiRoute);

const initServer = async () => {
    try {
        const data = await mongoose.connect(process.env.DB_URL);

        console.log("il back-end è connesso al db")
        app.listen(port, () =>
            console.log(`Il back-end sta ascoltando alla porta ${port}`))

    } catch (error) {
        console.error(error)
    }
}

initServer();