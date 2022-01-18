const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const dotenv = require("dotenv");
const homeRoutes = require("./routes/homeRoutes");
const postersRoutes = require("./routes/postersRoutes");

// Env variables
dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Initialize routes
app.use("/", homeRoutes);
app.use("/posters", postersRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
