const mongoose = require("mongoose")

    const blockedSchema = new mongoose.Schema({
        _id: {type: String, default: mongoose.Types.ObjectId},
        user: String,
        reason: String,
    });

module.exports = mongoose.model('blocked', blockedSchema)