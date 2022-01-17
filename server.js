const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const app = express();

// Env variables
dotenv.config();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
