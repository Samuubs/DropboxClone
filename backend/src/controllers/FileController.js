const File = require("../models/File");
const Box = require('../models/Box');

class FileController {
    async store(req, res) {
        const box = await Box.findById(req.params.id);
        
        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key,
        });

        box.files.push(file);
        await box.save();

        const loggedSocket = req.connectedUsers[box._id];

        req.io.to(loggedSocket).emit('file', file);

        return res.json(file);
    }
}

module.exports = new FileController();