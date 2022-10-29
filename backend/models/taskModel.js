const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    toDo: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('mytask', taskSchema)

