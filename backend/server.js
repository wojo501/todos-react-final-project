const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const routesUrls = require("./routes/routes");
const cors = require('cors');

dotenv.config();

// Use async/await to connect to MongoDB
(async () => {
  try {
    await mongoose.connect(process.env.DATABASE_ACCESS);
    console.log("Database connected");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();

app.use(express.json());
app.use(cors());
app.use("/app", routesUrls);

const port = process.env.PORT || 4000; // Use the PORT environment variable if set, or fallback to 4000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});