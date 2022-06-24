const Itinerary = require("../models/itinerary")

const itinerariesControllers = {
    getAllItineraries: async (req,res)=>{
        let itineraries
        let error = null
        try{
         itineraries = await Itinerary.find().populate("cityId")
        }catch (err) {error=err}
        res.json({
            response: error ? "ERROR" : itineraries,
            success: error ? false : true,
            error: error,
        })
        
    },
    
    getCityItineraries: async (req,res) => {
        const id = req.params.id;
        let error = null;
        let itineraries = [];
        try{
            itineraries = await Itinerary.find({cityId:id})
        } catch(err){
            error = err;
            console.log(error);
        }
        res.json({
            response: error ? 'Error requesting itineraries data' : itineraries,
            success: error ? false : true,
            error: error
        })
    },

    getOneItinerary: async(req,res)=>{
        const id = req.params.id;
        let itinerary
        let error = null
        try{
      itinerary = await Itinerary.findOne({ _id: id }).populate("cityId")
        }catch (err) { error = err}
        res.json({
            response: error ? "ERROR" : itinerary,
            success: error ? false : true,
            error: error
        })
    },

    uploadItinerary: async(req,res)=>{
        const {name,username,userimage,details,price,duration,hashtag,likes,activities,cityId} = req.body.data
        let itinerary
        let error = null
        try{
            itinerary = await new Itinerary({
                name:name,
                username:username,
                userimage:userimage,
                details:details,
                price:price,
                duration:duration,
                hashtag:hashtag,
                likes:likes,
                activities:activities,
                cityId:cityId
            }).save()
        }catch(err){error = err}
         res.json({
        response: error ? "ERROR" : itinerary,
        success: error ? false : true,
        error: error
    })


    },
    deleteItinerary: async(req,res)=>{
        const id = req.params.id;
        let itinerary
        let error=null
        try{
            itinerary = await Itinerary.findOneAndDelete({ _id: id })
        }catch(err){error = err}
        res.json({
            response: error ? "ERROR" : itinerary,
            success: error ? false : true,
            error: error
         
        })


    },
    modifyItinerary: async(req,res)=>{
        const id = req.params.id;
        const itinerary = req.body.data;
        let itinerarydb 
        let error = null
        try{
            itinerarydb = await Itinerary.findOneAndUpdate({ _id: id }, itinerary)
        }catch(err){error = err}
        res.json({
            response: error ? "ERROR" : itinerarydb,
            success: error ? false : true,
            error: error
        })

    }
}
module.exports = itinerariesControllers
    
    
    

