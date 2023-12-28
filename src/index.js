require("dotenv").config()

const express = require("express");
const errorHandler = require("./api/v1/middleware/ErrorHandler.js")

require("./config/db.js");

const app = express();
const port = 3000;

const userRoutes = require("./api/v1/routes/UserRoutes.js");

app.use(express.json());
app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(port, function () {
    console.log(`App is listening on port ${port}`);
});