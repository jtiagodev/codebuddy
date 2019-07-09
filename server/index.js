//require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const _ = require("lodash");
var exec = require("child_process").exec;
var cors = require("cors");

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// Execute Command
app.post("/execute", (req, res) => {
  console.log("EXECUTING");
  console.log(req.body.command);
  //   exec("ls -la", function(error, stdout, stderr) {
  //     if (!error) {
  //       // things worked!
  //     } else {
  //       // things failed :(
  //     }
  //   });
  res.status(200).json({});
});

// Compute Robot
app.post("/compute", (req, res) => {
  console.log("COMPUTING");

  console.log(req);
  res.status(200).json({});
});

var port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));
