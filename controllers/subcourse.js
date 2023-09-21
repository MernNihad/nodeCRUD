import mongoose from "mongoose";
import Course from "../models/Course.js";
import Hotel from "../models/Trainer.js";



// Create Course
export const createSubCourse = async (req, res, next) => {

    const { title, description } = req.body

    const { id } = req.params

    const newCourse = new Course({ title, description })

    try {

        const savedCourse = await newCourse.save();

        try {
            // Find the main course by its _id and push the sub-course's _id to the subCourses array
            await Course.findByIdAndUpdate(id, {
                $push: { subCourses: newCourse._id },
            });

            res.status(200).json(savedCourse);

        } catch (error) {

            next(error)
        }
    } catch (error) {

        next(error)
    }

}
// ------------------------------------------------



// Delete SubCourse
export const deleteSubCourse = async (req, res, next) => {

    const { id, subcourse } = req.params

    try {
        // to convert Object type
        const subcourseObjectId = new mongoose.Types.ObjectId(subcourse);

        await Course.findByIdAndUpdate(id, { $pull: { subCourses: subcourseObjectId } });
        res.status(200).json({ message: "Course has been deleted." });

    } catch (error) {

        next(error)

    }
}
// -----------------------------------------------