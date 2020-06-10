const express = require("express");

const DealersRouter = require("../dealers/car-dealersRouter");

// const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use("/api/dealers", DealersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up up and away" });
});

module.exports = server;
