import { Schema, model } from 'mongoose';

const bookingSchema = new Schema({
    checkInDate: {
        type: String,
        required: true
    },
    checkOutDate: {
        type: String,
        required: true
    },
    guestNum: {
        type: String,
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