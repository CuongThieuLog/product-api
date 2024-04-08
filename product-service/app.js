require("dotenv").config();
const express = require("express");
var cors = require("cors");
const port = 8004;
const app = express();
const route = require("./routes/index");
const bodyParser = require("body-parser");
const handleError = require("../common/error");
const connect = require("./config/database");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use("/", route);

app.use((err, req, res, next) => {
  handleError(err, req, res);
});

connect();

app.listen(port, () => {
  console.log("Server of user listening on " + port);
});
