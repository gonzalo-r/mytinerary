require("dotenv").config()
require("./config/database")
const cors = require("cors")
const passport = require("passport")
const Router = require("./routes/routes")
const itinerariesRouter = require("./routes/itinerariesroutes")
const express = require ("express");
const PORT = 4000
const server = express();


//middlewares
server.use(cors())
server.use(express.json())
server.use(passport.initialize())
server.use("/api", Router)
server.use("/api", itinerariesRouter)




server.get("/cities", (req, res)=>{
    res.send("SERVER OK")
})

/* server.get("/itineraries", (req, res)=>{
    res.send("SERVER OK")
})
 */
server.listen(PORT, ()=>{
    console.log("Server ready on port: " + PORT)
} )