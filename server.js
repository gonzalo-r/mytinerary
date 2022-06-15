require("dotenv").config()
require("./config/database")
const Router = require("./routes/routes")
const express = require ("express");
const { get, Server } = require("http");
const server = express();

const PORT = 4000

//middlewares
server.use(express.json())
server.use("/api", Router)
 

server.set("port",PORT)

server.get("/cities", (req, res)=>{
    res.send("SERVIDOR CREADO")
})

server.listen(PORT, ()=>{
    console.log("SERVIDOR CORRIENDO EN PUERTO: " + PORT)
} )