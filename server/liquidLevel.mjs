import express from "express";
import http from "http";
import * as socketio from "socket.io";
import mysql from "mysql";

const port = 5003;
const app = express();
const httpServer = http.createServer(app);
let dataLiquidLevel = [];

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
    `SELECT Leitura FROM medicao WHERE NomeSensor = 'liquidLevel' ORDER BY IDMedicao LIMIT ${currentRecordIndex}, 1`,
    function (error, results, fields) {
      if (error) throw error;
      console.log("results:", results);
      if (results.length === 1) {
        const liquidLevel = results[0].Leitura;
        if (dataLiquidLevel.length > 50) {
          dataLiquidLevel.reverse();
          dataLiquidLevel.pop();
          dataLiquidLevel.reverse();
        }
        dataLiquidLevel.push({ x: new Date().getSeconds(), y: liquidLevel });
        callback(dataLiquidLevel);
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
console.log("LiquidLevel on");

server.on("connection", (socket) => {
  console.log("connected");

  if (timeChange) clearInterval(timeChange);

  setInterval(
    () => fetchData((data) => socket.emit("message", JSON.stringify(data))),
    1000
  );
});

server.on("connect_error", (socket) => {
  console.log(socket.message);
});

httpServer.listen(port, () => {
  console.log(`Server running`);
});
