const express = require("express");
const cors = require("cors"); // Require future setup when website address is determined

const app = express();

var corsOptions = {
	origin: "http://localhost:5173",

	// optionsSuccessStatus:
};

app.use(cors(corsOptions));

// Serve static files from the 'public' directory
app.use("/gradcam", express.static("./public"));

const processRouter = require("./routes/process");
app.use(express.json());
app.use("/process", processRouter);

app.get("/", (req, res) => {
	res.send("Use /process to handle image rvf evalutation");
});

app.listen(4000, () => console.log("Server Started"));
