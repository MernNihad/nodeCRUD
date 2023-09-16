import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";



// Create Room
export const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelid

    const { title,price,maxPeople,desc,roomNumbers } = req.body

    const newRoom = new Room({ title,price,maxPeople,desc,roomNumbers })

    try {
        const savedRoom = await newRoom.save();

        try {
            
            await Hotel.findByIdAndUpdate(hotelId,{
                $push:{ rooms:savedRoom._id },
            })
        } catch (error) {
            next(error)    
        }
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error)
    }

}
// ------------------------------------------------




// Update Room
export const updateRoom = async (req, res, next) => {

    const { id } = req.params

    const { title,price,maxPeople,desc,roomNumbers } = req.body

    try {
        const updatedRoom = await Room.findByIdAndUpdate( id, { $set: { title,price,maxPeople,desc,roomNumbers } }, { new: true });
        res.status(200).json(updatedRoom);
    } catch (error) {
        next(error)
    }
}
// -------------------------------------------------



// Delete Room
export const deleteRoom = async (req, res, next) => {
    const { id } = req.params
    const hotelId = req.params.hotelid
    try {
        await Room.findByIdAndDelete(id);

        try {
            await Hotel.findByIdAndUpdate(hotelId,{
                $pull:{ rooms:id },
            })
        } catch (error) {
            next(error)    
        }

        res.status(200).json({ message: "Room has been deleted." });
    } catch (error) {
        next(error)
    }
}
// -----------------------------------------------



// Get Room
export const getRoom = async (req, res, next) => {
    const { id } = req.params
    try {
        const getRoom = await Room.findById(id);
        res.status(200).json(getRoom);
    } catch (error) {
        next(error)
    }
}
// -------------------------------------------





// Get All Rooms
export const getRooms = async (req, res, next) => {
    try {
        const Rooms = await Room.find();
        res.status(200).json(Rooms);
    } catch (error) {
        next(error);
    }
}
// -------------------------------------------------