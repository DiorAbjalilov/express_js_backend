const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const dotenv = require("dotenv");

// Env variables
dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
