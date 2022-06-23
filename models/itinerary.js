const mongoose = require("mongoose")
const { schema } = require("./city")

const itinerarySchema = new mongoose.schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    userimage: {type: String, required: true},
    price: {type: String, required: true},
    duration: {type: String, required: true},
    hash: {type: String, required: true},
    likes: {type: String, required: true},
    activities: {type: String, required: true},
    cityId: {type: mongoose.Schema.Types.ObjectId, ref: 'cities'} 


})

const itinerary = moongose.model("itineraries", itinerarySchema)
module.exports = itinerary