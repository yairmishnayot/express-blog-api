require("dotenv").config()

const express = require("express");

require("./config/db.js");

const app = express();
const port = 3000;

const usersController = require("./controllers/UsersController.js");

app.use(express.json());
app.use("/users", usersController);

app.listen(port, function () {
    console.log(`App is listening on port ${port}`);
});