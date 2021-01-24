const mongoose = require("mongoose")

    const collectorSchema = new mongoose.Schema({
        _id: {type: String, default: mongoose.Types.ObjectId},
        user: String,
    });

module.exports = mongoose.model('collectorrun', collectorSchema)