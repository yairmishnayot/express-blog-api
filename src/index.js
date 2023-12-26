import dotenv from "dotenv";
dotenv.config();

import express from "express";

import("./config/db.mjs");

const app = express();
const port = 3000;

import usersController from "./controllers/UsersController.mjs"

app.use("/users", usersController);

app.listen(port, function () {
    console.log(`App is listening on port ${port}`);
});