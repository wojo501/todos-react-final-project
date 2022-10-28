const express = require("express");
const router = express.Router();
const taskSchemaCopy = require("../models/taskModel")

router.post('/addTask', async (request, response) => {
    try {
        const addedTask = await taskSchemaCopy.create({
            text: request.body.text
        })
        const result = await addedTask.save()
        response.json(result)
    } catch (error) {
        response.json(error)
    }
})



router.get('/addTask', async (request, response) => {
    try {
        const tasks = await taskSchemaCopy.find()
        response.send(tasks)
        console.log(tasks)
    } catch (error) {
        response.json(error)
    }
})

module.exports = router