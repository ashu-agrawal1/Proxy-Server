const express = require("express");
const axios = require("axios");

const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.port;

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

// Proxy endpoint
app.post("/proxy", async (req, res) => {
  try {
    const { url } = req.body;
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching data from the requested URL");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
