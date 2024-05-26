import { model, Schema } from 'mongoose';

const reviewSchema = new Schema(
    {
        rating: {
            type: Number,
            required: true
        },

        comment: {
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
        collection: "AirBnb-review",
        timestamps: true
    }
);

export default model("Review", reviewSchema)