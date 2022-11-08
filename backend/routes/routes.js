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

router.get('/getTask', async (request, response) => {
    try {
        const tasks = await taskSchemaCopy.find()
        response.send(tasks)
    } catch (error) {
        response.json(error)
    }
})

router.patch("/updateTask/status", async (request, response) => {
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
        response.json(request.body.id)
    } catch (error) {
        response.json(error)
    }
})

router.delete('/deleteTask/:taskId', async (request, response) => {
    try {
        const taskId = request.params.taskId;
        const deletedTask = await taskSchemaCopy.deleteOne({ id: taskId })
        if (deletedTask.acknowledged) {
            response.json(taskId);
        }
    } catch (error) {
        response.json(error);
    }
})

router.patch("/updateTask/text", async (request, response) => {
    try {
        const updatedTask = await taskSchemaCopy.findOne({ id: request.body.id })
        updatedTask.text = request.body.text
        await updatedTask.save()
        response.json(updatedTask)
    } catch (error) {
        response.json(error)
    }
})

module.exports = router