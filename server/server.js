const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
const habitRoutes = require('./routes/habits');
const authRoutes = require('./routes/auth'); // Add this line

// Use routes
app.use('/api/habits', habitRoutes);
app.use('/api/auth', authRoutes); // Add this line

app.get("/", (req, res) => res.send("Server running"));

app.listen(5000, () => console.log("Server running on port 5000"));