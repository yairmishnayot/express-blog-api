const express = require("express")
const sequelize = require("../config/db.js");
const DataTypes = require('sequelize').DataTypes;


const userModel = require('../../models/user.js');
const User = userModel(sequelize, DataTypes);

const router = express.Router();

router.get("/", (req, res) => {
    res.send("get all users");
})

router.get("/:id", (req, res) => {
    res.send("get a single user");
})

router.post("/", async (req, res) => {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });

    res.status(201).json(newUser);
})

router.put("/:id", (req, res) => {
    res.send("update user");
});

router.delete("/:id", (req, res) => {
    res.send("delete a user");
})

module.exports = router;