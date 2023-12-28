const userModel = require('../../../../models/user.js');
const sequelize = require("../../../config/db.js");
const DataTypes = require('sequelize').DataTypes;
const User = userModel(sequelize, DataTypes);

const UsersController = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (err) {
            next(err)
        }
    },
    getUserById: async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                res.status(404);
                throw new Error("User not found");
            }
            res.status(200).json(user);
        } catch (err) {
            next(err)
        }
    },
    createUser: async (req, res, next) => {
        try {
            const { name, email } = req.body;
            const newUser = await User.create({ name, email });

            res.status(201).json(newUser);
        } catch (err) {
            next(err)
        }
    },
    updateUser: async (req, res, next) => {
        try {
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
        } catch (error) {
            next(err)
        }
    },
    deleteUser: async (req, res, next) => {
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