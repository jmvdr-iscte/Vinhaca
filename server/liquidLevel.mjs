import express from 'express'
import http from 'http'
import * as socketio from 'socket.io'
//import { MysqlConnection } from './databaseConnection.js';

const port = 5003;
const app = express()
const httpServer = http.createServer(app)
let dataliquidLevel=[]


var SensorData={
    liquidLevel:0.0
}
function generateData(){
  var  randomLiquidLevel = Math.floor(50 +Math.random() * 90)

    
    
    
    
     SensorData={
        liquidLevel:randomLiquidLevel,
    }
    
    if(dataliquidLevel.length>50){
        dataliquidLevel.reverse()
        dataliquidLevel.pop()
        dataliquidLevel.reverse()
    }
    
    
    dataliquidLevel.push({x: new Date().getMinutes, y: SensorData.liquidLevel})
   // MysqlConnection(SensorData.liquidLevel,"LiquidLevel")

    return(
    dataliquidLevel
)
}

const server = new socketio.Server(httpServer, {
    cors : {
        origin: '*',
    }
})
let timeChange
console.log("Liquid Level on")

server.on("connection",(socket)=>{

   
   
    console.log("connected")
    if(timeChange) clearInterval(timeChange)

   
  
  
   
    setInterval(() =>socket.emit("message",generateData()), 1000)
  })

httpServer.listen(port,'0.0.0.0');
