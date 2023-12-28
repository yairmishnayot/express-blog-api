const userModel = require('../../../../models/user.js');
const sequelize = require("../../../config/db.js");
const DataTypes = require('sequelize').DataTypes;
const User = userModel(sequelize, DataTypes);

const UsersController = {
    getAllUsers: async (req, res) => {
        const users = await User.findAll();
        res.status(200).json(users);
    },
    getUserById: async (req, res) => {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user);
    },
    createUser: async (req, res) => {
        const { name, email } = req.body;
        const newUser = await User.create({ name, email });

        res.status(201).json(newUser);
    },
    updateUser: async (req, res) => {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        const { name, email } = req.body;
        user.name = name;
        user.email = email;
        user.save();
        res.status(200).json(user);
    },
    deleteUser: async (req, res) => {
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
    }
}

module.exports = UsersController;