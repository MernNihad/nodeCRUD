import { Schema, model } from "mongoose";


const BranchSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
},
    { timestamps: true }
)

const Branch = model("Branch", BranchSchema);

export default Branch;