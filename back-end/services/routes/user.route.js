import { avatarCloud } from "../middlewares/multer.js";
import User from "../models/user.model.js";
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { generateJWT, authMiddleware } from "../middlewares/auth.js";

export const userApiRoute = Router();

userApiRoute.get("/", async (req, res, next) => {
    try {
        const allUsers = await User.find();
        res.send(allUsers)
    } catch (error) {
        next(error)
    }
})

userApiRoute.get("/me", authMiddleware, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.send(user)
    } catch (error) {
        next(error)
    }
})
userApiRoute.post("/register", async (req, res, next) => {
    try {
        const user = await User.create({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10)
        });

        const token = await generateJWT({
            email: user.email
        })
        res.send({ user, token })
    } catch (error) {
        next(error)
    }
})

userApiRoute.post("/login", async (req, res, next) => {
    try {
        const userFound = await User.findOne({
            email: req.body.email
        });

        if (userFound) {
            const isPasswordMatching = await bcrypt.compare(req.body.password, userFound.password);

            if (isPasswordMatching) {
                const token = await generateJWT({
                    email: userFound.email
                })

                res.send({ user: userFound, token })
            } else {
                res.status(400).send("Password errata")

            }
        } else {
            res.status(400).send("Utente non trovato")
        }

    } catch (error) {
        next(error)
    }
})


userApiRoute.put("/:id", async (req, res, next) => {
    try {
        const put = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        res.send(put)
    } catch (error) {
        next(error)
    }
})

userApiRoute.delete("/:id", async (req, res, next) => {
    try {
        const del = await User.findByIdAndDelete(req.params.id);

        res.send(del)
    } catch (error) {
        next(error)
    }
})

userApiRoute.patch("/:id/avatar", avatarCloud.single("avatar"), async (req, res, next) => {
    try {
        const update = await User.findByIdAndUpdate(req.params.id,
            { avatar: req.file.path },
            { new: true }
        );
        const token = await generateJWT({
            _id: update._id
        })

        res.send({ user: update, token })
    } catch (error) {
        next(error)
    }
})