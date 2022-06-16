require("dotenv").config()
require("./config/database")
const cors = require("cors")
const Router = require("./routes/routes")
const express = require ("express");
//const { get, Server, ServerResponse } = require("http");
const PORT = 4000
const server = express();


//middlewares
server.use(cors())
server.use(express.json())
server.use("/api", Router)
 

//server.set("port",PORT)

server.get("/cities", (req, res)=>{
    res.send("SERVIDOR CREADO")
})

server.listen(PORT, ()=>{
    console.log("Server ready on port: " + PORT)
} )