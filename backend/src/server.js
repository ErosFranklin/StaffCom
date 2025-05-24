const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");


dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// API routes
app.use("/api", routes);

// Start server
const serverPort = process.env.serverPort || 8000;
app.listen(serverPort, () => {
    console.log(`Server running at http://localhost:${serverPort}`);
});