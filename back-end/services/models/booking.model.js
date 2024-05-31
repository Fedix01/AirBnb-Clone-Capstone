import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    guestNum: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    confirm: {
        type: Boolean,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    insertion: {
        type: Schema.Types.ObjectId,
        ref: "Insertion"
    },

},
    {
        collection: "AirBnb booking",
        timestamps: true
    });

export default model("Booking", bookingSchema)