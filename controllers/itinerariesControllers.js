const Itinerary = require("../models/itinerary")

const itinerariesControllers = {
    getAllItineraries: async (req,res)=>{
        console.log(req) 
        const data= await Itinerary.find().populate("cityId")
        res.json({
            response: data})
        
    },
    
    getCityItineraries: async (req,res)=>{

        try{
            const itineraryxCity = await Itinerary.find({cityId:req.query.cityId})
            res.json({response:itineraryxCity})
        }catch(error){
            console.log(error)
        }

    },

    getOneItinerary: async(req,res)=>{
        const id = req.params.id;
        const data = await Itinerary.findOne({ _id: id }).populate("cityId")
        res.json({response:data})
    },

    uploadItinerary: (req,res)=>{
        const {image,name,username,details,price,hashtag,duration,cityId} = req.body
        new Itinerary({image,name,username,details,price,hashtag,duration,cityId}).save()
        .then((respuesta) => res.json({respuesta}))

         
    },
    deleteItinerary: async(req,res)=>{
        const id = req.params.id;
    await Itinerary.findOneAndDelete({ _id: id })
    .then((respuesta) =>res.json({respuesta}) )


    },
    modifyItinerary: async(req,res)=>{
        const id = req.params.id;
        const itinerary = req.body;

    await Itinerary.findOneAndUpdate({ _id: id }, itinerary)
    .then((respuesta) =>res.json({respuesta}) )
    }


}
module.exports = itinerariesControllers
    
    
    

