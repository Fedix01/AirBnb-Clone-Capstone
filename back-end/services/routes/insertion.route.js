import { Router } from "express";
import Insertion from '../models/insertion.model.js';
import User from '../models/user.model.js';
import Booking from '../models/booking.model.js';
import { authMiddleware } from "../middlewares/auth.js";
import { coverCloud } from "../middlewares/multer.js";
export const insertionApiRoute = Router();

insertionApiRoute.get("/", async (req, res, next) => {
    try {
        const insertion = await Insertion.find();
        res.send(insertion)
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.get("/findByCategory/:category", async (req, res, next) => {
    try {
        const category = await Insertion.find({ "category": req.params.category });
        res.send(category)
    } catch (error) {
        next(error)
    }

})

insertionApiRoute.get("/pagination", async (req, res, next) => {
    try {
        const queryPage = req.query.page;

        const itemsForPage = 3;

        const ins = await Insertion.find().skip(queryPage * itemsForPage).limit(itemsForPage);

        res.send(ins)
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

// Creo la booking
insertionApiRoute.post("/:id", authMiddleware, async (req, res, next) => {
    try {
        const userId = req.user.id;
        console.log(userId)
        const newBooking = await Booking.create({
            ...req.body,
            user: userId,
            insertion: req.params.id,
        });
        console.log(newBooking)
        const post = await Insertion.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    booking: newBooking
                }
            },
            { new: true });
        res.send(post)
    } catch (error) {
        next(error)
    }
})

// Nuova inserzione
insertionApiRoute.post("/", authMiddleware, async (req, res, next) => {
    try {

        const user = await User.findById(req.user.id);
        if (user) {
            const post = await Insertion.create({ ...req.body, user: user });

            // Assicurati che l'array insertions esista
            if (!user.insertions) {
                user.insertions = [];
            }

            user.insertions.push(post._id);
            await user.save();
            res.send(post);
        }
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        const put = await Insertion.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });

        res.send(put)
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const del = await Insertion.findByIdAndDelete(req.params.id);

        res.send(del)
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.get("/:id/booking", authMiddleware, async (req, res, next) => {
    try {
        const allBookings = await Booking.findById({
            insertion: req.params.id,
            user: req.user.id
        });
        res.send(allBookings);
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.patch("/:id/covers", coverCloud.any("covers"), async (req, res, next) => {
    try {
        const covers = req.files.map(file => file.path);
        const update = await Insertion.findByIdAndUpdate(req.params.id,
            { covers: covers },
            { new: true }
        );
        res.send(update)
    } catch (error) {
        next(error)
    }
})