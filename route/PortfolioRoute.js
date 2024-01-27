require('dotenv').config();
const multer = require("multer");
const express = require("express");
const portfolioController = require("../controller/PortfolioController");
const crudService = require("../service/CrudService");
const authenticationService = require("../service/AuthenticationService");
const passport = require("passport");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, process.env.IMG_ROOT + process.env.IMG_BACKEND + process.env.IMG_PORTFOLIO);
    }, filename: (req, file, callback) => {
        callback(null, crudService.createFilename(file));
    }
});

const upload = multer({storage: storage});

const portfolioRouter = express.Router();

portfolioRouter.get("/", portfolioController.findAll);

portfolioRouter.get("/:id", portfolioController.findOne);

portfolioRouter.get("/:offset/:limit", portfolioController.findAllPaging);

portfolioRouter.post("/admin", passport.authenticate("jwt", {session : false}),
    authenticationService.checkUserRole, upload.array("images"), portfolioController.create);

portfolioRouter.put("/admin/order", passport.authenticate("jwt", {session : false}),
    authenticationService.checkUserRole, portfolioController.changeOrder);

portfolioRouter.put("/admin/:id", passport.authenticate("jwt", {session : false}),
    authenticationService.checkUserRole, upload.array("images"), portfolioController.update);

portfolioRouter.delete("/admin/:id", passport.authenticate("jwt", {session : false}),
    authenticationService.checkUserRole, portfolioController.delete);

module.exports = portfolioRouter;