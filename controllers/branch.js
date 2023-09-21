import Hotel from "../models/Trainer.js";
import Room from "../models/Branch.js";
import Branch from "../models/Branch.js";



// Create Room
export const createBranch = async (req, res, next) => {

    const { title } = req.body

    const newBranch = new Branch({title})

    try {
        const savedBranch = await newBranch.save();

        res.status(200).json(savedBranch);

    } catch (error) {
        next(error)
    }

}
// ------------------------------------------------




// Update Branch
export const updateBranch = async (req, res, next) => {

    const { id } = req.params

    const { title } = req.body

    try {

        const updatedBranch = await Branch.findByIdAndUpdate( id, { $set: { title } }, { new: true });

        res.status(200).json(updatedBranch);

    } catch (error) {

        next(error)

    }
}
// -------------------------------------------------



// Delete Branch
export const deleteBranch = async (req, res, next) => {
    const { id } = req.params

    try {
        await Branch.findByIdAndDelete(id);

        res.status(200).json({ message: "Branch has been deleted." });

    } catch (error) {

        next(error)
    }
}
// -----------------------------------------------



// Get Branch
export const getBranch = async (req, res, next) => {
    const { id } = req.params
    try {
        const getBranch = await Branch.findById(id);
        res.status(200).json(getBranch);
    } catch (error) {

        next(error)
    }
}
// -------------------------------------------





// Get All Branch
export const getBranchs = async (req, res, next) => {
    try {
        const Branchs = await Branch.find();
        res.status(200).json(Branchs);
    } catch (error) {

        next(error);
    }
}
// -------------------------------------------------