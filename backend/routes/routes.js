const { response } = require("express");
const express = require("express");
const { CommentsController } = require("moongose/controller");
const { update } = require("../models/taskModel");
const router = express.Router();
const taskSchemaCopy = require("../models/taskModel")

router.post('/addTask', async (request, response) => {
    try {
        const addedTask = await taskSchemaCopy.create({
            text: request.body.text,
            id: request.body.id
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

router.patch("/addTask", async (request, response) => {
    try {
        const updatedTask = await taskSchemaCopy.findOne({ id: request.body.id })
        if (updatedTask.toDo) {
            updatedTask.text = "(DONE) " + updatedTask.text;
            updatedTask.toDo = false;
        } else {
            updatedTask.text = updatedTask.text.replace("(DONE) ", "")
            updatedTask.toDo = true;
        }
        await updatedTask.save()
        console.log("updatedTask: ", updatedTask)
    } catch (error) {
        response.json(error)
    }
})

router.post('/removeTask', async (request, response) => {
    try {
        const deletedTask = await taskSchemaCopy.deleteOne({ id: request.body.id })
        console.log(deletedTask)
    } catch (error) {
        response.json(error)
    }
})

router.patch("/removeTask", async (request, response) => {
    try {
        const updatedTask = await taskSchemaCopy.findOne({ id: request.body.id })
        updatedTask.text = request.body.text
        await updatedTask.save()
        console.log("updatedTask: ", updatedTask)
    } catch (error) {
        response.json(error)
    }
})

module.exports = router