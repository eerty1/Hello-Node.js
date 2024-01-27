const authenticationController = require("../controller/AuthenticationController");
const express = require("express");

const authenticationRouter = express.Router();

authenticationRouter.post("/login", authenticationController.login);

authenticationRouter.post("/registration", authenticationController.register);

module.exports = authenticationRouter;