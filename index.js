const express = require('express');
require('dotenv').config();
const empRoutes = require('./routes/employees.routes');
let connectDb = require('./db/connect');


let app = express();
app.use(express.json())
app.use("/api/v1/employees", empRoutes);

//! Page Not Found
app.all("*", (req, res, next) => {
    res.status(404).json({ error: true, message: "Page Not Found" })
})

//! Server side errors
app.use((err, req, res, next) => {
    res.status(500).json({ error: true, message: err.message })
})

//! Connecting to Database and starting the server
let startServer = async () => {
    try {
        await connectDb(process.env.MONGO_DEV_URL);
        console.log("MongoDb Connected Sucessfully")
        app.listen(process.env.PORT, () => { console.log(`Server is Running on port ${process.env.PORT}`) })
    }
    catch (err) {
        console.log(err)
    }
}


startServer()