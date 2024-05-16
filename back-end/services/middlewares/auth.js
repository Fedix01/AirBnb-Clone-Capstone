import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const generateJWT = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1d" },
            (err, token) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(token)
                }
            }
        )
    })
}

export const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err, decoded) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(decoded)
                }
            }
        )
    })
}

// Middleware per richieste che necessitano token

export const authMiddleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(400).send("Effettua il login")
        } else {
            const decoded = await verifyJWT(
                req.headers.authorization.replace("Bearer ", "")
            );
            if (decoded.exp) {
                delete decoded.iat;
                delete decoded.exp;


                const me = await User.findOne({
                    ...decoded
                });

                if (me) {
                    req.user = me;
                    next()
                } else {
                    res.status(400).send("Utente non trovato")
                }
            } else {
                res.status(400).send("Rieffettua il login")
            }
        }

    } catch (error) {
        next(error)
    }
}