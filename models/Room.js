import { Schema, model } from "mongoose";


const RoomSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    roomNumbers: [{ number:Number, unavailableDates:{type:[Date]} }],
    
},
{
    timestamps:true,
}
)

const Room = model("Room",RoomSchema);

export default Room;