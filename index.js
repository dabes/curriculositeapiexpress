const express = require("express");
const bodyParser = require("body-parser");
const busboy = require("connect-busboy");
const path = require("path");
const cors = require("cors");
// const morgan = require("morgan");
const fs = require("fs");

require("dotenv").config();

const db = require("./db");

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "";
const corsAllowed = process.env.SITE || "";

app.use(
  cors({
    methods: ["GET", "HEAD", "POST", "PATCH", "DELETE"],
    origin: process.env.ORIGIN,
  })
);
app.use(busboy());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "200mb",
  })
);

const dir = path.join(__dirname, "assets");
app.use("/upload", express.static(dir));

const routePath = "./routes/";
fs.readdirSync(routePath).forEach(function (file) {
  var route = routePath + file;
  require(route)(app);
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
  db.on("error", (error) => console.error(error));
  db.once("open", () => console.log("connected to database"));
});
