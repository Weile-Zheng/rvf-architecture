const express = require('express');
const cors=require('cors'); // Require future setup when website address is determined

const app = express();

var corsOptions = {
    // ToDO:
    // origin: 
    // optionsSuccessStatus:
}

app.use(cors(corsOptions));

// Setting up url routes

const processRouter = require("./routes/process")
app.use(express.json());
app.use("/process", processRouter);

app.listen(4000, ()=>console.log("Server Started"));
