import { Schema, model } from 'mongoose';

const UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    username: {
        type: String,
        unique: true,
        required: true
    },

    birthday: {
        type: String,
        required: false
    },

    work: {
        type: String,
        required: false
    },

    address: {
        type: String,
        required: false
    },

    password: {
        type: String,
        select: false,
        required: true
    },

    avatar: {
        type: String,
        required: false
    },

    isHost: {
        type: Boolean,
        required: true
    }

},
    {
        collection: "AirBnb User",
        timestamps: true

    });

export default model("User", UserSchema);