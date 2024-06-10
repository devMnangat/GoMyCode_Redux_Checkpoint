const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const todoRoute = require("./routes/todoRoute")

// create port
const PORT = process.env.PORT || 5000;

// mongoose connection
mongoose.connect("mongodb://localhost:27017/to-do-list-app")
.then(() => {
    console.log("MongoDB connected successfully")
})
.catch(err=>console.log(`An error has occurred - ${err.message}`))
// create app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/todoss", todoRoute)
// error
app.all("*", (req,res)=>res.status(404).send({msg:"Invalid route"}))
app.listen(PORT, () => console.log(`App is running on POR ${PORT}`));
