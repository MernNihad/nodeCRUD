import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    picLink: {
        type: String,
    },
}, { timestamps: true })

const User = model("User", UserSchema);

export default User;




















// import { Schema, model } from "mongoose";

// const UserSchema = new Schema({
//     username: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false,
//     },
// }, { timestamps: true });

// const User = model("User", UserSchema);

// export default User;



