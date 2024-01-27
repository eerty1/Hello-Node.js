require('dotenv').config();
const crudService = require("../service/CrudService")
const e = require("express");
const portfolioTable = require("../models").portfolio;

exports.findAll = (req, res) => {
    crudService.findAll(portfolioTable)
        .then(portfolios => {
            if (!portfolios) res.status(404).json({
                message: "Not found",
            });

            res.send(portfolios);
        })
        .catch((error) => {
            res.status(500).json({
                message: error
            });
        });
};

exports.findOne = (req, res) => {
    return crudService.findOne(req.params.id, portfolioTable)
        .then(portfolios => {
            if (!portfolios) res.status(404).json({
                message: "Not found",
            });

            res.send(portfolios);
        })
        .catch((error) => {
            res.status(500).json({
                message: error
            });
        });
};

exports.findAllPaging = (req, res) => {
    crudService.findAllPaging(req.params.offset, req.params.limit, portfolioTable)
        .then(portfolio => {
            if (!portfolio) res.status(404).json({
                message: "Not found",
            });

            res.send(portfolio);
        })
        .catch((error) => {
            res.status(500).json({
                message: error
            });
        });
};

exports.create = (req, res) => {
    const portfolios = JSON.parse(req.body.portfolio);
    portfolios.photos = crudService.joinImagePaths(req.files, process.env.IMG_PORTFOLIO);

    crudService.create(portfolios, portfolioTable)
        .then(() => {
            res.status(200).json({
                message: "Successfully added",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: error
            });
        });
};

exports.changeOrder = (req, res) => {
    crudService.changeOrder(req.body, portfolioTable)
        .then(() => {
            res.status(200).json({
                message: "Successfully added",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: error
            });
        });
};

exports.update = (req, res) => {
    const portfolio = JSON.parse(req.body.portfolio);
    crudService.deletePhotos(portfolio.photos);
    portfolio.photos = crudService.joinImagePaths(req.files, process.env.IMG_PORTFOLIO);

    crudService.update(req.params.id, portfolio, portfolioTable)
        .then(portfolio => {
            if (portfolio == 1) res.status(200).json({
                message: "Successfully updated"
            })

            else res.status(404).json({
                message: "Not found",
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: error
            });
        });
};

exports.delete = (req, res) => {
    crudService.findOne(req.params.id, portfolioTable)
        .then(portfolio => {
            crudService.deletePhotos(portfolio.photos);
        })
        .then(()=> {
            crudService.delete(req.params.id, req.body, portfolioTable)
                .then(portfolio => {
                    if (portfolio == 1) res.status(200).json({
                        message: "Successfully deleted"
                    })

                    else res.status(404).json({
                        message: "Not found",
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        message: error
                    });
                });
        });
};