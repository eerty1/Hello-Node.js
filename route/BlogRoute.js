require('dotenv').config();
const multer = require("multer");
const express = require("express");
const blogController = require("../controller/BlogController");
const crudService = require("../service/CrudService");
const authenticationService = require("../service/AuthenticationService");
const passport = require("passport");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, process.env.IMG_ROOT + process.env.IMG_BACKEND + process.env.IMG_BLOG);
    }, filename: (req, file, callback) => {
        callback(null, crudService.createFilename(file));
    }
});

const upload = multer({storage: storage});
const blogRouter = express.Router();

blogRouter.get("/", blogController.findAll);

blogRouter.get("/:id", blogController.findOne);

blogRouter.get("/:offset/:limit", blogController.findAllPaging);

blogRouter.post("/admin", passport.authenticate("jwt", {session : false}),
    authenticationService.checkUserRole, upload.array("images"), blogController.create);

blogRouter.put("/admin/order", passport.authenticate("jwt", {session : false}),
    authenticationService.checkUserRole, blogController.changeOrder);

blogRouter.put("/admin/:id", passport.authenticate("jwt", {session : false}),
    authenticationService.checkUserRole, upload.array("images"), blogController.update);

blogRouter.delete("/admin/:id", passport.authenticate("jwt", {session : false}),
    authenticationService.checkUserRole, blogController.delete);

module.exports = blogRouter;