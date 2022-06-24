const mongoose = require("mongoose")
const { schema } = require("./city")

const itinerarySchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    userimage: {type: String, required: true},
    details: {type: String, required: true},
    price: {type: String, required: true},
    duration: {type: String, required: true},
    hashtag: {type: String, required: true},
    likes: {type: String, required: true},
    activities: {type: String},
    cityId: {type: mongoose.Types.ObjectId, ref: 'cities'} 


})

const Itinerary = mongoose.model("itineraries", itinerarySchema)
module.exports = Itinerary