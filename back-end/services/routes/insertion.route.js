import { Router } from "express";
import Insertion from '../models/insertion.route.js'
export const insertionApiRoute = Router();

insertionApiRoute.get("/", async (req, res, next) => {
    try {
        const insertion = await Insertion.find();
        res.send(insertion)
    } catch (error) {
        next(error)
    }
})
insertionApiRoute.get("/:id", async (req, res, next) => {
    try {
        const singleIns = await Insertion.findById(req.params.id);

        res.send(singleIns)
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.post("/", async (req, res, next) => {
    try {
        const post = await Insertion.create(req.body);

        res.send(post)
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.put("/:id", async (req, res, next) => {
    try {
        const put = await Insertion.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        res.send(put)
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.delete("/:id", async (req, res, next) => {
    try {
        const del = await Insertion.findByIdAndDelete(req.params.id);

        res.send(del)
    } catch (error) {
        next(error)
    }
})