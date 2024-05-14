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
        required: true
    },

    username: {
        type: String,
        required: true
    },

    birthday: {
        type: String,
        required: false
    },

    password: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        required: false
    },

    host: {
        type: Boolean,
        required: true
    }

},
    {
        collection: "AirBnb User",
        timestamps: true

    });

export default model("User", UserSchema);