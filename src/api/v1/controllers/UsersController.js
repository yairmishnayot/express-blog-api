const userModel = require('../../../../models/user.js');
const sequelize = require("../../../config/db.js");
const { tryCatch } = require('../../../utils/tryCatch.js');
const DataTypes = require('sequelize').DataTypes;
const User = userModel(sequelize, DataTypes);

const UsersController = {
    getAllUsers: tryCatch(async (req, res, next) => {
        const users = await User.findAll();
        res.status(200).json(users);
    }),

    getUserById: tryCatch(async (req, res, next) => {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        res.status(200).json(user);
    }),

    createUser: tryCatch(async (req, res, next) => {
        const { name, email } = req.body;
        const newUser = await User.create({ name, email });

        res.status(201).json(newUser);
    }),

    updateUser: tryCatch(async (req, res, next) => {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404);
            throw new Error("user not found");
        }
        const { name, email } = req.body;
        user.name = name;
        user.email = email;
        user.save();
        res.status(200).json(user);
    }),

    deleteUser: tryCatch(async (req, res, next) => {
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
}

module.exports = UsersController;