import { Schema, model } from 'mongoose';

const insertionSchema = new Schema({
    category: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    details: {
        type: String,
        required: true
    },

    cover: {
        type: String,
        required: false
    },

    price: {
        type: String,
        required: true
    },

    place: {
        type: String,
        required: true
    },

    availability: {
        type: Boolean,
        required: false
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    booking: [
        {
            type: Schema.Types.ObjectId,
            ref: "Booking"
        }
    ]
},

    {
        collection: "AirBnb insertion",
        timestamps: true
    })

export default model("Insertion", insertionSchema)