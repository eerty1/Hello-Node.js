require('dotenv').config();
const path = require("path");
const fs = require("fs");


exports.findAll = (table) => {
    return table.findAll({
        order: [
            ["dragNdrop", 'ASC']
        ]
    });
};

exports.findOne = (id, table) => {
    return table.findByPk(id);
};

exports.findAllPaging = (offset, limit, table) => {
    return table.findAll({
        offset: offset,
        limit: limit,
        order: [
            ["dragNdrop", 'ASC']
        ]
    })
        .then(data => {
            if (data)
                return table.count()
                    .then(size => {
                        return {
                            size: size,
                            amountOfPages: Math.ceil(size / limit),
                            data: data
                        };
                    });
        });
};


exports.findOneByUsername = (username, table) => {
    return table.findOne({
        where: {
            username: username
        }
    });
};

exports.create = (body, table) => {
    return table.create(body);
};

exports.update = (id, body, table) => {
    return table.update(body, {
        where: {
            id: id
        }
    });
};

exports.changeOrder = (body, table) => {
    return table.bulkCreate(
        body, { updateOnDuplicate: ["dragNdrop"] }
    );
};

exports.delete = (id, body, table) => {
    return table.destroy({
        where: {
            id: id
        }
    });
};

exports.joinImagePaths = (files, entityDirectory) => {
    let path = "";
    files.forEach((file) => {
        path += process.env.IMG_BACKEND + entityDirectory + file.filename + ",";
    });
    return path.slice(0, path.length - 1);
}

exports.createFilename = (file) => {
    return crypto.randomUUID() + path.extname(file.originalname);
}

exports.deletePhotos = (photos) => {
    photos.split(",").forEach(photo => {
        fs.unlinkSync(process.env.IMG_ROOT + photo);
    });
}

