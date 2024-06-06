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
        }).select('+password');

        if (userFound) {
            const isPasswordMatching = await bcrypt.compare(req.body.password, userFound.password);

            if (isPasswordMatching) {
                const token = await generateJWT({
                    _id: userFound._id
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


userApiRoute.put("/:id", authMiddleware, async (req, res, next) => {
    try {

        const updateData = { ...req.body };

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10)
        }

        const newUser = await User.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        const token = await generateJWT({
            _id: newUser._id
        })
        res.send({ newUser, token })
    } catch (error) {
        next(error)
    }
})

userApiRoute.delete("/:id", authMiddleware, async (req, res, next) => {
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

// Preferiti
userApiRoute.post("/:id/favorites", authMiddleware, async (req, res, next) => {
    try {
        const insertionId = req.params.id;
        const user = req.user.id;

        const userDoc = await User.findById(user);
        if (userDoc.favorites.includes(insertionId)) {
            return res.status(400).send({ message: "Insertion already in favorites" });
        }

        userDoc.favorites.push(insertionId);
        await userDoc.save();

        res.send(userDoc)
    } catch (error) {
        next(error)
    }
})

userApiRoute.get("/favorites", authMiddleware, async (req, res, next) => {
    try {
        const user = req.user.id;
        const getFav = await User.findById(user).populate({
            path: "favorites",
            model: "Insertion"
        });

        res.send(getFav)
    } catch (error) {
        next(error)
    }
})

userApiRoute.delete("/:id/favorites", authMiddleware, async (req, res, next) => {
    try {
        const insertionId = req.params.id;
        const user = req.user.id;
        const searchUser = await User.findById(user);

        if (searchUser.favorites.includes(insertionId)) {
            searchUser.favorites.pull(insertionId);
            await searchUser.save()
        }
        res.send(searchUser)
    } catch (error) {
        next(error)
    }
})