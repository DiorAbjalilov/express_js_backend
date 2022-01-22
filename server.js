const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Connecting to database
connectDB();

// Env variables
dotenv.config();

const app = express();
// set static folder

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
// Initialize template engine (handlebars)
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Initialize routes
app.use("/", require("./routes/homeRoutes"));
app.use("/posters", require("./routes/postersRoutes"));
app.use("/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
