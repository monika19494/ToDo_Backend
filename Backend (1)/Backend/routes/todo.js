
const express = require("express");
const { isAuthenticated } = require("../auth");
const toDoData = require("../model/toDo")

const router = express.Router();

router.post("/addnewActivity", isAuthenticated, async (req, res) => {
    try {
        let todo = await toDoData.create({ ...req.body.data, _id });
        res.json({ todo, message: "To Do Data Added Succesfully" })
    }
    catch (e) {
        res.json({ error: e.message })

    }
})
router.put("/addnewActivity/:id", async (req, res) => {
    try {
        const todo = await toDoData.findOne({ _id: req.params.id })
        if (todo.Action === "Start") {
            return res.json({ message: "Finish the Ongoing Task first or Pause" })
        }
        const updateData = await toDoData.updateOne({ _id: req.params.id }, { $set: { Action: "End" || "Pause" } })
        res.json({
            message: "Action Done", updateData
        })
    }
    catch (e) {
        res.json(e.message)
    }

})


module.exports = router;