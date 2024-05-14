import User from "../models/user.model.js";
import { Router } from 'express';

export const userApiRoute = Router();

userApiRoute.get("/", async (req, res, next) => {
    try {
        const allUsers = await User.find();
        res.send(allUsers)
    } catch (error) {
        next(error)
    }
})

userApiRoute.get("/:id", async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user)
    } catch (error) {
        next(error)
    }
})
userApiRoute.post("/", async (req, res, next) => {
    try {
        const post = await User.create(req.body);
        res.send(post)
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