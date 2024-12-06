const express = require("express")
const ClassRouter = require("./class")
const StudentRouter = require("./student")

const app = express();
app.use(express.json());

// Use the routes
app.use("/classes", ClassRouter);
app.use("/students", StudentRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});