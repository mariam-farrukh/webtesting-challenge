const express = require("express");
const server = express();

// const UserRouter = require("../users/user-router.js");

server.use(express.json());

// server.use("/api/users", UserRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "connected" });
});

module.exports = server;