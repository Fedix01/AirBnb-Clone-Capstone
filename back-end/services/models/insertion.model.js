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
        required: true
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

    host: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},

    {
        collection: "AirBnb insertion",
        timestamps: true
    })

export default model("Insertion", insertionSchema)