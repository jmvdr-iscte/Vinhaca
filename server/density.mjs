import express from "express";
import http from "http";
import * as socketio from "socket.io";
import mysql from "mysql";

const port = 5002;
const app = express();
const httpServer = http.createServer(app);
let dataDensity = [];

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
    `SELECT Leitura FROM medicao WHERE NomeSensor = 'Density' ORDER BY IDMedicao LIMIT ${currentRecordIndex}, 1`,
    function (error, results, fields) {
      if (error) throw error;
      console.log("results:", results);
      if (results.length === 1) {
        const density = results[0].Leitura;
        if (dataDensity.length > 50) {
          dataDensity.reverse();
          dataDensity.pop();
          dataDensity.reverse();
        }
        dataDensity.push({ x: new Date().getSeconds(), y: density });
        callback(dataDensity);
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
console.log("Density on");

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
