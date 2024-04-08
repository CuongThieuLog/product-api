require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const handleError = require("../common/error");
const connect = require("./config/database");
const route = require("./routes/index");

const port = process.env.PORT || 8080;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/", route);

app.use((err, req, res, next) => {
  handleError(err, req, res);
});

connect();

app.listen(port, () => {
  console.log("Server listening on " + port);
});
