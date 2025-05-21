const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const drinkRoutes = require('./routes/drinkRoutes.js');
const managerRoutes = require('./routes/managerRoutes.js');
const ownerRoutes = require('./routes/ownerRoutes.js');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// API routes
app.use("/api", routes);
app.use('/api', drinkRoutes);
app.use('/api', managerRoutes);
app.use('/api', ownerRoutes);

// Start server
const serverPort = process.env.serverPort || 8000;
app.listen(serverPort, () => {
    console.log(`Server running at http://localhost:${serverPort}`);
});