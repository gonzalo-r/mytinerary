const Cities = require("../models/cities")

const citiesControllers = {
    getCities: async (req, res) =>{
        let Cities
        let error = null
        try{
            cities = await Cities.find()
            console.log(cities)
        } catch (err) { error = err}
        res.json({
            response: error ? "ERROR" : {cities},
            success: error ? false : true,
            error: error
        })
    },

    getOneCity: async (req, res) =>{
        let citie = value.params.id
        let Cities
        let error = null
    }

}
module.exports = citiesControllers