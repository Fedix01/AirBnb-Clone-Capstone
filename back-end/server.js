import express from 'express';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import { userApiRoute } from './services/routes/user.route.js';
import { insertionApiRoute } from './services/routes/insertion.route.js';
import cors from 'cors';
import { log } from './services/middlewares/log.js';
import { badRequestHandler, genericErrorHandler, notFoundHandler, unhautorizedHandler } from './services/middlewares/errorHandler.js';
import passport from 'passport';
import googleStrategy from './services/middlewares/passport.js';

config();
// Creo il server
const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
// Abilito cors per comunicazione col front-end
app.use(cors());
// Google strategy per login con google
passport.use("google", googleStrategy);
// Inserisco un log
app.use(log)
// Rotte
app.use("/api/user", userApiRoute);
app.use("/api/insertion", insertionApiRoute);
app.get("*", (req, res, next) => {
    const error = new Error;
    error.status = 404;
    error.message = "Page Not Found";
    res.send(error)
})

// Gestione Errori
app.use(badRequestHandler);
app.use(unhautorizedHandler);
app.use(notFoundHandler);
app.use(genericErrorHandler);
// Inizializzo server
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