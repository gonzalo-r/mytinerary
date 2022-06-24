const itinerariesRouter = require(`express`).Router();

const itinerariesControllers = require(`../controllers/itinerariescontrollers`);

const { getAllItineraries, getOneItinerary,uploadItinerary,deleteItinerary, modifyItinerary,getCityItineraries} = itinerariesControllers;

itinerariesRouter.route(`/itineraries`)
.get(getAllItineraries)
.post(uploadItinerary)

itinerariesRouter.route(`/itineraries/:id`)
.delete(deleteItinerary)
.put(modifyItinerary)
.get(getOneItinerary)

itinerariesRouter.route("/cityItineraries/:id")
.get(getCityItineraries)

module.exports = itinerariesRouter;