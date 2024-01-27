require('dotenv').config();
const crudService = require("../service/CrudService")
const e = require("express");
const blogTable = require("../models").blog;

exports.findAll = (req, res) => {
    crudService.findAll(blogTable)
        .then(blogs => {
            if (!blogs) res.status(404).json({
                message: "Not found",
            });

            res.send(blogs);
        })
        .catch((error) => {
            res.status(500).json({
                message: error
            });
        });
};

exports.findAllPaging = (req, res) => {
    crudService.findAllPaging(req.params.offset, req.params.limit, blogTable)
        .then(blogs => {
            if (!blogs) res.status(404).json({
                message: "Not found",
            });

            res.send(blogs);
        })
        .catch((error) => {
            res.status(500).json({
                message: error
            });
        });
};

exports.findOne = (req, res) => {
    return crudService.findOne(req.params.id, blogTable)
        .then(blog => {
            if (!blog) res.status(404).json({
                message: "Not found",
            });

            res.send(blog);
        })
        .catch((error) => {
            res.status(500).json({
                message: error
            });
        });
};

exports.create = (req, res) => {
    const blog = JSON.parse(req.body.blog);
    blog.photos = crudService.joinImagePaths(req.files, process.env.IMG_BLOG)
    crudService.create(blog, blogTable)
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
    crudService.changeOrder(req.body, blogTable)
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
    const blog = JSON.parse(req.body.blog);
    crudService.deletePhotos(blog.photos);
    blog.photos = crudService.joinImagePaths(req.files, process.env.IMG_BLOG);

    crudService.update(req.params.id, blog, blogTable)
        .then(blog => {
            if (blog == 1) res.status(200).json({
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
    crudService.findOne(req.params.id, blogTable)
        .then(blog => {
            crudService.deletePhotos(blog.photos);
        })
        .then(()=> {
            crudService.delete(req.params.id, req.body, blogTable)
                .then(blog => {
                    if (blog == 1) res.status(200).json({
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