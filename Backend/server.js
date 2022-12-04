const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;
app.use(cors());
app.use(bodyParser.json());

const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useNewUrlParser: true, useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongo Connection Success");
})

const studentRouter = require("./routes/students.js");
app.use("/student", studentRouter);

app.listen(PORT, () => {
    console.log(`Server Is up and Running on port Number : ${PORT}`);
})