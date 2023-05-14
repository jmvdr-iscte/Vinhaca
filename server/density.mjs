import express from 'express'
import http from 'http'
import * as socketio from 'socket.io'
//import { MysqlConnection } from './databaseConnection.js';
const port = 5002;
const app = express()
const httpServer = http.createServer(app)
let dataDensity=[]


var SensorData={
    Density:0.0
   
}
function generateData(){
  var randomDensity = Math.floor(12.9 +Math.random() * 59.4)
    
     SensorData={
        Density:randomDensity,
    }
    
    if(dataDensity.length>50){
        dataDensity.reverse()
        dataDensity.pop()
        dataDensity.reverse()
    }
    
    
    dataDensity.push({x: new Date().getMinutes, y: SensorData.Density})
   // MysqlConnection(SensorData.Density,"Density")

    return(
  dataDensity
)
}

const server = new socketio.Server(httpServer, {
    cors : {
        origin: '*',
    }
})
let timeChange
console.log("Density on")

server.on("connection",(socket)=>{

   
   
    console.log("connected")
    if(timeChange) clearInterval(timeChange)

   
    setInterval(() =>socket.emit("message",generateData()),  2*30*1000)
  })

httpServer.listen(port,'0.0.0.0');
