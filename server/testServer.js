const express = require("express");
const app = express();

app.use("/sensors/", require("./routes/sensorRoutes"));

app.listen(3001, function(){
    console.log("Express server is running on port 3001")
})