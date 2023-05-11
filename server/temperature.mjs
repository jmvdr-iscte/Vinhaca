import express from 'express'
import http from 'http'
import * as socketio from 'socket.io'
//import { MysqlConnection } from './databaseConnection.js';

const port = 5001;
const app = express()
const httpServer = http.createServer(app)
let dataTemperature=[]


var SensorData={
    Temperature:0.0,

}
function generateData(){
  var  randomTemperature = Math.floor(20 +Math.random() * 0)

    
    
    
     SensorData={
        Temperature:randomTemperature
    }
    
    if(dataTemperature.length>50){
        dataTemperature.reverse()
        dataTemperature.pop()
        dataTemperature.reverse()
    }
    
    
    dataTemperature.push({x: new Date().getMinutes, y: SensorData.Temperature})
   // MysqlConnection(SensorData.Temperature,"Temperature")

return(
    dataTemperature
)
}

const server = new socketio.Server(httpServer, {
    cors : {
        origin: '*',
    }
})
let timeChange
console.log("Temperature on")

server.on("connection",(socket)=>{
    console.log("connected")
    if(timeChange) clearInterval(timeChange)

   
    setInterval(() =>socket.emit("message",generateData()), 2*30*1000)
  })

httpServer.listen(port,'0.0.0.0');
