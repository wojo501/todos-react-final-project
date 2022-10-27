const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    id: {
        type: String,
        default: Math.random().toString()
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

