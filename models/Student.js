import mongoose, { Schema, model } from "mongoose";

const StudentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value);
            },
            message: 'Invalid email format',
        },
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
    courseRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    isStudent: {
        type: Boolean,
        default: true,
    },
    assignedTrainersRef: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trainer"
        }
    ],
    github: {
        type: String,
        validate: {
            validator: function (value) {
                // Basic GitHub URL validation using regular expression
                return /^https:\/\/github\.com\/[A-Za-z0-9_.-]+$/.test(value);
            },
            message: 'Invalid GitHub URL format',
        },
    },
    linkedin: {
        type: String,
        validate: {
            validator: function (value) {
                // Basic LinkedIn URL validation using regular expression
                return /^https:\/\/www\.linkedin\.com\/in\/[A-Za-z0-9_.-]+$/.test(value);
            },
            message: 'Invalid LinkedIn URL format',
        },
    },
}, { timestamps: true });

const Student = model("Student", StudentSchema);

export default Student;
