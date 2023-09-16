import Hotel from "../models/Hotel.js";



// Create Hotel
export const createHotel = async (req, res, next) => {

    const { name, type, city, address, distance, photos, desc, title, rating, rooms, cheapestPrice, featured } = req.body

    const newHotel = new Hotel({ name, type, city, address, distance, photos, desc, title, rating, rooms, cheapestPrice, featured })

    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        next(error)
    }

}
// ------------------------------------------------




// Update Hotel
export const updateHotel = async (req, res, next) => {

    const { id } = req.params

    const { name, type, city, address, distance, photos, desc, title, rating, rooms, cheapestPrice, featured } = req.body

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(id, { $set: { name, type, city, address, distance, photos, desc, title, rating, rooms, cheapestPrice, featured } }, { new: true });
        res.status(200).json(updatedHotel);
    } catch (error) {
        next(error)
    }
}
// -------------------------------------------------



// Delete Hotel
export const deleteHotel = async (req, res, next) => {
    const { id } = req.params
    try {
        await Hotel.findByIdAndDelete(id);
        res.status(200).json({ message: "Hotel has been deleted." });
    } catch (error) {
        next(error)
    }
}
// -----------------------------------------------



// Get Hotel
export const getHotel = async (req, res, next) => {
    const { id } = req.params
    try {
        const getHotel = await Hotel.findById(id);
        res.status(200).json(getHotel);
    } catch (error) {
        next(error)
    }
}
// -------------------------------------------





// Get All Hotels
export const getHotels = async (req, res, next) => {
    try {
        const Hotels = await Hotel.find();
        res.status(200).json(Hotels);
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
