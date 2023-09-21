import mongoose, { Schema, model } from "mongoose";

const TrainerSchema = new Schema({
    name: {
        type:String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        match: /^\d{10}$/, // Use a regular expression to enforce 10 digits
    },
    branchRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
    },  
    courseRef: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
    isTrainer: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

const Trainer = model("Trainer", TrainerSchema);

export default Trainer;
