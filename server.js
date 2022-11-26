/////////////////////////////////////////////////////////////////////////
              /* Server Configration with Express */
/////////////////////////////////////////////////////////////////////////

/* Express */
// Congfig EXPRESS to run Server & Routes
const express = require("express");
const app = express();  // Start up instance of app

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware */
// Config EXPRESS to use Body-Parser as MiddleWare
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Config Cors 2 use Body-Parser as Middleware
const cors = require("cors"); // Cors 4 Cross Origin Allwance
app.use(cors());

app.use(express.static('Website')); // Initialize the Main Project Folder

/* Server Configration */
const port = 8080; // Setup port
const localhost = "127.0.0.1";
// Spin up Our Server ♥
const server = app.listen(port, () => {
  console.log(`Server R Running at http://${localhost}:${port}/`);
});

/////////////////////////////////////////////////////////////////////////

let tempratureData = {};

/////////////////////////////////////////////////////////////////////////
                          /* Getting Data */
/////////////////////////////////////////////////////////////////////////

app.get("/ClientData", (request, response) => {
  response.send(tempratureData);
  //console.log(tempratureData);
});

/////////////////////////////////////////////////////////////////////////
                          /* Sending Data */
/////////////////////////////////////////////////////////////////////////

app.post('/ServerData', (request, response) => {
  tempratureData = request.body;
  response.send({
    information: "Data hase been Sending Successfully 💙",
    message: "We hope you enjoy good weather today 🌹"
  });
  //console.log(tempratureData);
});
