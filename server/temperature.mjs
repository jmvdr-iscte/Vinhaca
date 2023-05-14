import express from "express";
import http from "http";
import * as socketio from "socket.io";
import mysql from "mysql";

const port = 5001;
const app = express();
const httpServer = http.createServer(app);
let dataTemperature = [];

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "vinhaca_1_1",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Deu certo");
});

let currentRecordIndex = 0;

function fetchData(callback) {
  connection.query(
    `SELECT Leitura FROM medicao WHERE NomeSensor = 'Temperature' ORDER BY IDMedicao LIMIT ${currentRecordIndex}, 1`,
    function (error, results, fields) {
      if (error) throw error;
      console.log("results:", results);
      if (results.length === 1) {
        const temperature = results[0].Leitura;
        if (dataTemperature.length > 50) {
          dataTemperature.reverse();
          dataTemperature.pop();
          dataTemperature.reverse();
        }
        dataTemperature.push({ x: new Date().getSeconds(), y: temperature });
        callback(dataTemperature);
      } else {
        console.log(`No more records to fetch.`);
      }
    }
  );
  currentRecordIndex++;
}

const server = new socketio.Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let timeChange;
console.log("Temperature on");

server.on("connection", (socket) => {
  console.log("connected");

  if (timeChange) clearInterval(timeChange);

  timeChange = setInterval(
    () => fetchData((data) => socket.emit("message", JSON.stringify(data))),
    1000 // fetch data every second
  );
});


server.on("connect_error", (socket) => {
  console.log(socket.message);
});

httpServer.listen(port, () => {
  console.log(`Server running`);
});
