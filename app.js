import express from "express"
import mongoose from "mongoose";

const app = express();


app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/soft');
app.get("/", async(req, res) => {
    let result = await mongoose.connection.collection("users").find().toArray();
    res.json(result)
})

app.post("/", (req, res) => {

    mongoose.connection.collection("users").insertOne(req.body)

})


app.listen(4000, () => {
    console.log(`Server running... PORT: ${4000}`)
})