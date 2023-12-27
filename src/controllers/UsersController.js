const express = require("express")
const sequelize = require("../config/db.js");
const DataTypes = require('sequelize').DataTypes;


const userModel = require('../../models/user.js');
const User = userModel(sequelize, DataTypes);

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
})

router.get("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
})

router.post("/", async (req, res) => {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });

    res.status(201).json(newUser);
})

router.put("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        res.status(404).json({ error: "User not found" });
    }
    const { name, email } = req.body;
    user.name = name;
    user.email = email;
    user.save
    res.status(200).json(user);
});

router.delete("/:id", async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        res.status(404).json({ error: "User not found" });
    }
    await User.destroy({
        where: {
            id: req.params.id
        }
    });

    res.status(200).json({ message: "User deleted" });
})

module.exports = router;