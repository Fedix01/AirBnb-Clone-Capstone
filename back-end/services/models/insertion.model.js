import { Schema, model } from 'mongoose';

const insertionSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    hostType: {
        type: String,
        required: true
    },

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

    covers: [
        {
            type: String,
            required: false
        }
    ],

    price: {
        type: Number,
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

    services: {
        roomDetails: {
            type: String,
            required: false
        },

        bathDetails: {
            type: String,
            required: false
        },

        otherDetails: {
            type: String,
            required: false
        }
    },

    houseRules: {
        checkInRule: {
            type: String,
            required: true
        },
        checkOutRule: {
            type: String,
            required: true
        },
        petsRule: {
            type: Boolean,
            required: true
        }
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    bookings: [
        {
            type: Schema.Types.ObjectId,
            ref: "Booking"
        }
    ],

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
},

    {
        collection: "AirBnb insertion",
        timestamps: true
    })

export default model("Insertion", insertionSchema)