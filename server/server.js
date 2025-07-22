const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const habitRoutes = require('./routes/habits');
app.use('/api/habits', habitRoutes);

app.get("/", (req, res) => res.send("Server running"));

app.listen(5000, () => console.log("Server running on port 5000"));