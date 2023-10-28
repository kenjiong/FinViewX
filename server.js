require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const debug = require("debug")("mern:server");
const usersRouter = require("./routes/api/usersRoutes");
const assetsRouter = require("./routes/api/assetsRoutes");
const liabilitiesRouter = require("./routes/api/liabilitiesRoutes");
const savingsRouter = require("./routes/api/savingsRoutes");
const retirementRouter = require("./routes/api/retirementRoutes");

//* app
const app = express();

//* middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.use(require("./config/checkToken"));

//* routes
app.get("/api", (req, res) => {
  res.send("Welcome to FinViewX");
});
// API routes
app.use("/api/users", usersRouter);
app.use("/api/assets", assetsRouter);
app.use("/api/liabilities", liabilitiesRouter);
app.use("/api/savings", savingsRouter);
app.use("/api/retirement", retirementRouter);

// "catch all" route
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

//* listen
const port = process.env.PORT || 3000;

app.listen(port, function () {
  debug(`Express app running on port ${port}`);
});
