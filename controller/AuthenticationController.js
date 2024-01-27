require('dotenv').config();
const userTable = require("../models").user;
const crudService = require("../service/CrudService")
const {hashSync, compareSync} = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    const body = {
        username: req.body.username,
        password: hashSync(req.body.password, 10)
    };

    crudService.create(body, userTable)
        .then(() => {
            res.status(200).json({
                message: "Successfully registered"
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: error
            });
        });
};

exports.login = (req, res) => {
    crudService.findOneByUsername(req.body.username, userTable)
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "User not found"
                });
            }

            if (!compareSync(req.body.password, user.password)) {
                return res.status(401).json({
                    message: "Incorrect password"
                });
            }

            //todo Переделать контент токена
            res.status(200).json({
                token: jwt.sign({
                        username: user.username,
                        role: user.role
                    },
                    process.env.JWT_SECRET, {expiresIn: "1d"})
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: error
            });
        });
};