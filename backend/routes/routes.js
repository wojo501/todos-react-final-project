const { response } = require("express");
const express = require("express");
const router = express.Router();
const taskSchemaCopy = require("../models/taskModel")
const userSchemaCopy = require("../models/userModel")

router.post('/registerUser', async (request, response) => {
    try {
        const user = await userSchemaCopy.findOne({ 
            email: request.body.email
        });

        if (user) {
            response.status(423).send({
                message: "This email already exists."
            });
        } else {
            const addedUser = await userSchemaCopy.create({
                id: request.body.id,
                name: request.body.name,
                email: request.body.email,
                password: request.body.password 
            });

            const newUser = await addedUser.save();
            response.status(200).json({
                userId: newUser.id
            });
        }
    } catch (error) {
        response.json(error);
    }
});


router.post('/loginUser', async (request, response) => {
    try {
        const user = await userSchemaCopy.findOne({ 
            email: request.body.email, 
            password: request.body.password 
        });

        if (!user) {
            response.status(422).send({
                message: "User not found."
            });
        }

        response.status(200).json({
            userId: user.id
        });
    } catch (error) {
        response.status(500).json({ error: "Internal server error" });
    }
});

router.post('/addTask', async (request, response) => {
    try {
        const addedTask = await taskSchemaCopy.create({
            text: request.body.text,
            id: request.body.id,
            userId: request.body.userId,
        })
        const result = await addedTask.save()
        response.json(result)
    } catch (error) {
        response.json(error)
    }
})

router.get('/:userId/getTasks', async (request, response) => {
    try {
        const userId = request.params.userId; // Get the userId from the URL

        const tasks = await taskSchemaCopy.find({ userId }); // Use userId as a filter

        response.json(tasks); // Send the tasks as a JSON response
    } catch (error) {
        response.status(500).json({ error: "Internal server error" });
    }
});


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