const Router = require("express").Router();

const citiesControllers = require("../controllers/citiesControllers");
const {getCities, getOneCity, addCity, modifyCity, removeCity} = citiesControllers

Router.route("/cities")
.get(getCities)


module.exports = Router
