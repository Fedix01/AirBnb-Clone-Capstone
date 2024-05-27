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
        collection: "booking",
        timestamps: true
    });

export default model("Booking", bookingSchema)