import Course from "../models/Course.js";





// // Create Course
// export const createCourseCode = async (req, res, next) => {

//     const { courseCode } = req.body

//     const newCourse = new Course({ courseCode })

//     try {
//         const savedCourse = await newCourse.save();
//         res.status(200).json(savedCourse);
//     } catch (error) {
//         next(error)
//     }

// }
// // ------------------------------------------------






// Create Course
export const createCourse = async (req, res, next) => {

    const { title,description,isMainCourse } = req.body

    
    const newCourse = new Course({ title,description:description,isMainCourse:isMainCourse})
    
    console.log(newCourse)
    try {
        const savedCourse = await newCourse.save();
        res.status(200).json(savedCourse);
    } catch (error) {
        next(error)
    }

}
// ------------------------------------------------




// Update Course
export const updateCourse = async (req, res, next) => {

    const { id } = req.params

    const { title,description,isMainCourse } = req.body

    try {
        const updatedCourse = await Course.findByIdAndUpdate(id, { $set: { title, isMainCourse,description } }, { new: true });
        res.status(200).json(updatedCourse);
    } catch (error) {
        next(error)
    }
}
// -------------------------------------------------



// Delete Course
export const deleteCourse = async (req, res, next) => {
    const { id } = req.params

    try {
        await Course.findByIdAndDelete(id);
        res.status(200).json({ message: "Course has been deleted." });
    } catch (error) {
        next(error)
    }
}
// -----------------------------------------------



// Get Course
export const getCourse = async (req, res, next) => {
    const { id } = req.params
    try {
        const getCourse = await Course.findById(id);
        res.status(200).json(getCourse);
    } catch (error) {
        next(error)
    }
}
// -------------------------------------------





// Get All Hotels
export const getCourses = async (req, res, next) => {
    try {
        const Courses = await Course.find();
        res.status(200).json(Courses);
    } catch (error) {
        next(error);
    }
}
// -------------------------------------------------



// Get count By City
export const countByCity = async (req, res, next) => {

    const cities = req.query.cities.split(",");

    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city });
        }))
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
}
// -------------------------------------------------



// Get count By City
export const countByType = async (req, res, next) => {

    const typesOf = ['hotel', 'apartment', 'resort', 'villa', 'cabin']

    try {
        const hotelCount = await Hotel.countDocuments({ type: typesOf[0] })
        const apartmentCount = await Hotel.countDocuments({ type: typesOf[1] })
        const resortsCount = await Hotel.countDocuments({ type: typesOf[2] })
        const villasCount = await Hotel.countDocuments({ type: typesOf[3] })
        const cabinCount = await Hotel.countDocuments({ type: typesOf[4] })

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortsCount },
            { type: "villa", count: villasCount },
            { type: "cabin", count: cabinCount },
        ]);
    } catch (error) {
        next(error);
    }
}
// -------------------------------------------------
