require("dotenv").config()
require("./config/database")
const cors = require("cors")
const Router = require("./routes/routes")
const express = require ("express");
const PORT = 4000
const server = express();


//middlewares
server.use(cors())
server.use(express.json())
server.use("/api", Router)
 



server.get("/cities", (req, res)=>{
    res.send("SERVER OK")
})

server.listen(PORT, ()=>{
    console.log("Server ready on port: " + PORT)
} )