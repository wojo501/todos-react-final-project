const express = require("express");
const router = express.Router();
const taskSchemaCopy = require("../models/taskModel")

router.post('/addTask', async (request, response) => {
    try {
        const addedTask = await taskSchemaCopy.create({
            text: request.body.text
        })
        await addedTask.save()
        console.log("saved", addedTask)
    } catch (error) {
        response.json(error)
    }
})

module.exports = router