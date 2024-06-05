import { Router } from "express";
import Insertion from '../models/insertion.model.js';
import User from '../models/user.model.js';
import Booking from '../models/booking.model.js';
import Review from '../models/review.model.js';
import { authMiddleware } from "../middlewares/auth.js";
import { coverCloud } from "../middlewares/multer.js";
export const insertionApiRoute = Router();

insertionApiRoute.get("/", async (req, res, next) => {
    try {
        const insertion = await Insertion.find().populate({
            path: "bookings",
            model: "Booking",
            select: ["checkInDate", "checkOutDate", "guestNum", "totalPrice", "confirm", "user", "insertion"],
            populate: [
                {
                    path: "user",
                    model: "User",
                    select: ["name", "surname", "avatar"]
                },
                {
                    path: "insertion",
                    model: "Insertion",
                    select: ["title"]
                }

            ]
        });
        res.send(insertion)
    } catch (error) {
        next(error)
    }
})

const getDatesFromPeriod = (startDate, endDate) => {
    let currentDate = startDate;
    const dates = [];
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;

};

insertionApiRoute.post("/search", async (req, res, next) => {
    try {
        const requestedDates = getDatesFromPeriod(new Date(req.body.checkInDate), new Date(req.body.checkOutDate));
        const regex = new RegExp(req.body.placeInput, "i");
        const insertions = await Insertion.find({
            place: { $regex: regex }
        }).populate({
            path: "bookings",
            model: "Booking",
        }).populate({
            path: "reviews",
            model: "Review",
            select: ["rating"]
        }).populate({
            path: "user",
            model: "User",
            select: ["name", "surname"]
        });

        const availableInsertions = insertions.filter(insertion => {
            const isAvailable = insertion.bookings.every(booking => {
                const bookingCheckInDate = new Date(booking.checkInDate);
                const bookingCheckOutDate = new Date(booking.checkOutDate);

                return requestedDates.every(date => date < bookingCheckInDate || date > bookingCheckOutDate);
            });
            return isAvailable
        });


        res.send(availableInsertions)
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.get("/findByCategory/:category/pagination", async (req, res, next) => {
    try {

        const queryPage = req.query.page;

        const itemsForPage = 2;

        const category = await Insertion.find({ "category": req.params.category })
            .skip(queryPage * itemsForPage)
            .limit(itemsForPage).populate({
                path: "reviews",
                model: "Review",
                select: ["rating"]
            }).populate({
                path: "user",
                model: "User",
                select: ["name", "surname"]
            });

        res.send(category)
    } catch (error) {
        next(error)
    }

})

insertionApiRoute.get("/pagination", async (req, res, next) => {
    try {
        const queryPage = req.query.page;

        const itemsForPage = 2;

        const ins = await Insertion.find()
            .skip(queryPage * itemsForPage)
            .limit(itemsForPage).populate({
                path: "reviews",
                model: "Review",
                select: ["rating"]
            }).populate({
                path: "user",
                model: "User",
                select: ["name", "surname"]
            });

        res.send(ins)
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.get("/:id", async (req, res, next) => {
    try {
        const singleIns = await Insertion.findById(req.params.id).populate({
            path: "user",
            model: "User"
        }
        ).populate({
            path: "reviews",
            model: "Review",
            select: ["rating", "comment", "user"]
        }).populate({
            path: "bookings",
            model: "Booking",
        });

        res.send(singleIns)
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

//Recensioni

insertionApiRoute.get("/:id/allReviews", async (req, res, next) => {
    try {
        const allRev = await Review.find({
            insertion: req.params.id
        }).populate({
            path: "user",
            model: "User",
            select: ["name", "surname", "avatar"]
        }).sort({ "updatedAt": -1 });
        res.send(allRev)
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.get("/:id/reviews", async (req, res, next) => {
    try {
        const insertionId = req.params.id;

        const itemsForPage = 4;

        const allRev = await Review.find({
            insertion: insertionId
        }).populate({
            path: "user",
            model: "User",
            select: ["name", "surname", "avatar"]
        }).sort({ "updatedAt": -1 }).limit(itemsForPage)

        res.send(allRev)
    } catch (error) {
        next(error)
    }
});

insertionApiRoute.get("/:id/reviews/:reviewId", async (req, res, next) => {
    try {
        const rev = await Review.find({
            insertion: req.params.id,
            _id: req.params.reviewId
        }).populate({
            path: "user",
            model: "User",
            select: ["name", "surname", "avatar"]
        });

        res.send(rev)
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.post("/:id/reviews", authMiddleware, async (req, res, next) => {
    try {
        let userId = req.user.id;

        const newRev = await Review.create({
            ...req.body,
            insertion: req.params.id,
            user: userId
        });

        const post = await Insertion.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    reviews: newRev
                }
            },
            { new: true }
        ).populate({
            path: "reviews",
            populate: {
                path: "user",
                model: "User",
                select: ["name", "surname", "avatar"]
            }
        })

        res.send(post)
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.put("/:id/reviews/:reviewId", authMiddleware, async (req, res, next) => {
    try {
        const putRev = await Review.findOneAndUpdate({
            insertion: req.params.id,
            _id: req.params.reviewId
        },
            req.body,
            { new: true }).populate({
                path: "user",
                model: "User",
                select: ["name", "surname", "avatar"]
            });

        res.send(putRev)
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.delete("/:id/reviews/:reviewId", authMiddleware, async (req, res, next) => {
    try {
        const delRev = await Review.findOneAndDelete({
            insertion: req.params.id,
            _id: req.params.reviewId
        });
        res.send(delRev)
    } catch (error) {
        next(error)
    }
})

// Booking
insertionApiRoute.get("/userBooking/:userId", authMiddleware, async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const allBookings = await Booking.find({
            user: userId
        }).populate({
            path: "user",
            model: "User",
            select: ["name", "surname", "avatar"]
        }).populate({
            path: "insertion",
            model: "Insertion"
        });
        res.send(allBookings)
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.get("/:id/booking", authMiddleware, async (req, res, next) => {
    try {
        const allBookings = await Booking.find({
            insertion: req.params.id,
        }).populate({
            path: "user",
            model: "User",
            select: ["name", "surname", "avatar"]
        }).populate({
            path: "insertion",
            model: "Insertion",
            select: ["title", "_id"]
        });
        res.send(allBookings);
    } catch (error) {
        next(error)
    }
})



insertionApiRoute.post("/:id/booking", authMiddleware, async (req, res, next) => {
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
                    bookings: newBooking
                }
            },
            { new: true }).populate({
                path: "bookings",
                populate: {
                    path: "user",
                    model: "User",
                    select: ["name", "surname", "avatar"]
                }
            });
        res.send(post)
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.put("/:id/booking/:bookingId", authMiddleware, async (req, res, next) => {
    try {
        const updateStatus = await Booking.findByIdAndUpdate({
            insertion: req.params.id,
            _id: req.params.bookingId
        },
            { $set: { confirm: req.body.confirm } },
            { new: true });
        res.send(updateStatus)
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.put("/:id/booking/:bookingId", authMiddleware, async (req, res, next) => {
    try {
        const putBooking = await Booking.findOneAndUpdate({
            insertion: req.params.id,
            _id: req.params.bookingId
        },
            req.body,
            { new: true }
        );
        res.send(putBooking)
    } catch (error) {
        next(error)
    }
})

insertionApiRoute.delete("/:id/booking/:bookingId", authMiddleware, async (req, res, next) => {
    try {
        const deleteBooking = await Booking.findOneAndDelete({
            insertion: req.params.id,
            _id: req.params.bookingId
        });
        res.send(deleteBooking)
    } catch (error) {
        next(error)
    }
})