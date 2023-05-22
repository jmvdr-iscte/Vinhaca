const express = require("express");
const { signup } = require("../controllers/auth.js");
const { login } = require("../controllers/auth.js");
const { isAuth } = require("../controllers/auth.js");
const updateWineWeightedAverageRatings = require("../ratingAlgorithm.js");
//await let= {Aux}= require('../controllers/auth.js')

var mysql = require("mysql");
const { Console } = require("console");
var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "vinhaca",
});

var ID = "";
var dataSugestions = "";

con.connect(function (error) {
  if (error) console.log(error);
  else console.log("connected");
});

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.get("/private", isAuth);

router.get("/public", (req, res, next) => {
  res.status(200).json({ message: "here is your public resource" });
});

router.get("/vinho", function (req, res) {
  updateWineWeightedAverageRatings();
  con.query(
    "select * from vinho ORDER BY Rating DESC",
    function (error, rows, fields) {
      if (error) console.log(error);
      else {
        res.send(rows);
      }
    }
  );
});

router.get("/vinhoProd/:IDVinho", function (req, res) {
  const idVinho = req.params.IDVinho;

  const responseData = {
    wine: null,
    vinhocastaItems: [],
  };


  



  // Query the Vinho table using the IDVinho parameter
  con.query(
    "SELECT * FROM vinho WHERE IDVinho = ?",
    [idVinho],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      } else {
        if (rows.length > 0) {
          responseData.wine = rows[0];

          // Query the Vinho-Casta table using the IDVinho parameter
          con.query(
            "SELECT v.*, c.NomeCasta FROM `vinho-casta` v JOIN casta c ON v.IDCasta = c.IDCasta WHERE v.IDVinho = ?",
            [idVinho],
            function (error, vinhocastaRows, fields) {
              if (error) {
                console.log(error);
                res.status(500).send("Internal Server Error");
              } else {
                // Map through vinhocastaRows and add the NomeCasta property to each item
                const updatedVinhocastaItems = vinhocastaRows.map((item) => ({
                  ...item,
                  NomeCasta: item.NomeCasta
                }));
          
                // Update the responseData with the modified vinhocastaItems
                responseData.vinhocastaItems = updatedVinhocastaItems;
          
                // Send the response data
                res.send(responseData);
              }
            }
          );

        } else {
          res.status(404).send("Wine not found");

          
        }
      }
    }
  );
});


router.post('/InfoProd', (req, res) => {
  const { IDProducao, Info, Step, WineQuantity, Mosto } = req.body;

  // Create an object to store both Info and Step
  const updatedData = {
    IDProducao: IDProducao,
    Step: Step,
    Info: JSON.parse(Info),
    WineQuantity: WineQuantity,
    Mosto: Mosto,

    
  };

  

  // Update the "Info" column in the "producao" table
  const query = "UPDATE producao SET Info = ? WHERE IDProducao = ?";
con.query(query, [JSON.stringify(updatedData), IDProducao], (error, results) => {
  if (error) {
    console.error('Error updating "Info" column:', error);
    res.status(500).json({ error: 'Internal server error' });
  } else {
    console.log('Info column updated successfully');
    res.status(200).json(updatedData);
  }
});
});

router.post("/castasSugestions", (req, res) => {
  const data = req.body.data;
  const ids = data.map((item) => item.id);

  const idList = ids.map((id) => `SELECT ${id} as id`).join(" UNION ");

  const query = `
      SELECT v.* 
      FROM \`vinho\` v
      WHERE v.IDVinho IN (
        SELECT t1.IDVinho 
        FROM \`vinho-casta\` t1
        JOIN (${idList}) t2 ON t1.IDCasta = t2.id
        GROUP BY t1.IDVinho
        HAVING COUNT(DISTINCT t1.IDCasta) = ${ids.length}
      )
    `;

  con.query(query, function (error, rows, fields) {
    if (error) console.log(error);
    else {
      console.log(rows);
      res.send(rows); // sends the selected wines back to the client
    }
  });
});

router.get("/castas", function (req, res) {
  con.query("select * from casta", function (error, rows, fields) {
    if (error) console.log(error);
    else {
      res.send(rows);
    }
  });
});

router.get("/ultimaLeituraTemp", function (req, res) {
  con.query("SELECT * FROM medicao WHERE NomeSensor = 'Temperature' ORDER BY IDMedicao DESC LIMIT 1", function (error, rows, fields) {
    if (error) console.log(error);
    else {
      res.send(rows);
    }
  });
});


router.get("/ultimaLeituraData", function (req, res) {
  con.query("SELECT * FROM medicao WHERE NomeSensor = 'Density' ORDER BY IDMedicao DESC LIMIT 1", function (error, densityRows, fields) {
    if (error) console.log(error);
    else {
      con.query("SELECT * FROM medicao WHERE NomeSensor = 'liquidLevel' ORDER BY IDMedicao DESC LIMIT 1", function (error, liquidLevelRows, fields) {
        if (error) console.log(error);
        else {
          con.query("SELECT * FROM medicao WHERE NomeSensor = 'Temperature' ORDER BY IDMedicao DESC LIMIT 1", function (error, temperatureRows, fields) {
            if (error) console.log(error);
            else {
              const result = {
                density: densityRows[0],
                liquidLevel: liquidLevelRows[0],
                temperature: temperatureRows[0]
              };
              res.send(result);
            }
          });
        }
      });
    }
  });
});



router.get("/favorito", function (req, res) {
  UtilizadorID = ID;
  sqlParams = [UtilizadorID];

  con.query(
    "select * from favorito where UtilizadorID= ?",
    //"SELECT f.*, v.NomeVinho FROM favorito f JOIN Vinho v ON f.IDVinho = v.IDVinho WHERE f.UtilizadorID = ?",
    sqlParams,
    function (error, rows, fields) {
      if (error) console.log(error);
      else {
        res.send(rows);
      }
    }
  );
});

router.post("/inserirFavorito", function (req, res) {
  let NomeVinho = req.body.item.NomeVinho + " - " + req.body.item.NomeProducao;
  let IDVinho = req.body.item.IDVinho;

  var query =
    "SELECT * FROM favorito WHERE NomeVinho = ? AND IDVinho = ? AND UtilizadorID = ?";
  let values = [NomeVinho, IDVinho, ID];

  con.query(query, values, function (err, result) {
    if (err) throw err;

    if (result.length === 0) {
      // the wine is not already a favorite, so we can add it
      var insertQuery =
        "INSERT INTO favorito (NomeVinho, IDVinho, UtilizadorID) VALUES ? ";
      let insertValues = [[NomeVinho, IDVinho, ID]];

      con.query(insertQuery, [insertValues], function (err, result) {
        if (err) throw err;
        res.send("Favorite added successfully");
      });
    } else {
      // the wine is already a favorite, so we don't need to add it again
      res.send("Favorite already exists");
    }
  });
});

router.delete("/favorito/:id", function (req, res) {
  const favId = req.params.id;
  const sqlParams = [favId];

  con.query(
    "DELETE FROM favorito WHERE IDfavorito = ?",
    sqlParams,
    function (error, result) {
      if (error) console.log(error);
      else {
        res.send("Favorite deleted successfully");
      }
    }
  );
});

router.post("/userIds", function (req, res) {
  // console.log(req.body.params)

  sqlParams = [req.body.params];
  con.query(
    "select Utilizadorid from Utilizadores where email =?",
    sqlParams,
    function (error, rows, fields) {
      if (error) console.log(error);
      else {
        ID = rows[0].Utilizadorid;
      }
    }
  );
  res.status(200).send("bem crl");
});

router.post("/reviews", function (req, res) {
  console.log(req.body.params);

  let Review = req.body.params.review;
  let Rating = req.body.params.rating;
  let idWine = req.body.params.idWine;

  var query =
    "INSERT INTO review ( descricaoReview , Utilizadorid, reviewRating, IDVinho) VALUES ? ";

  let values = [[Review, ID, Rating, idWine]];

  con.query(query, [values], function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});

router.post("/inserirProducao", function (req, res) {
  //  console.log(req.body.item)
  let NomeProducao = req.body.item.NomeProducao;
  console.log(NomeProducao);
  let IDVinho = req.body.item.IDVinho;

  var query =
    "INSERT INTO producao ( NomeProducao , IDVinho, Utilizadorid) VALUES ? ";
  let values = [[NomeProducao, IDVinho, ID]];

  con.query(query, [values], function (err, result) {
    if (err) throw err;
    //console.log(result)
  });
});

router.get("/producao", function (req, res) {
  Utilizadorid = ID;
  sqlParams = [Utilizadorid];

  con.query(
    "select * from producao where Utilizadorid= ?",
    sqlParams,
    function (error, rows, fields) {
      //con.query('select * from vinho where IDVinho in (select IDVinho from producao where Utilizadorid = ?)', sqlParams, function(error, rows, fields){
      if (error) console.log(error);
      else {
        res.send(rows);
      }
    }
  );
});

// will match any other path
router.use("/", (req, res, next) => {
  res.status(404).json({ error: "page not found" });
});

module.exports = router;
