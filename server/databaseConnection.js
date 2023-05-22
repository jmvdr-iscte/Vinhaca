function MysqlConnection(data, sensor) {
  var mysql = require("mysql");

  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vinhaca",
  });

  connection.connect(async function (err, delay) {
    if (err) throw err;

    console.log("connected");

    var query = "INSERT INTO medicao (Leitura, NomeSensor) VALUES ?";
    var values = [[data, sensor]];

    connection.query(query, [values], function (err, result) {
      if (err) throw err;
      //console.log(result)

      connection.end();
    });
  });
}
module.exports = { MysqlConnection };
