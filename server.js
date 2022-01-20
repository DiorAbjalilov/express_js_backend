const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { engine } = require("express-handlebars");
const dotenv = require("dotenv");
const homeRoutes = require("./routes/homeRoutes");
const postersRoutes = require("./routes/postersRoutes");

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
app.use("/", homeRoutes);
app.use("/posters", postersRoutes);

// mongoose
const connectDB = async () => {
  const conn = await mongoose.connect("mongodb://localhost:27017/postersApp", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB Connected:${conn.connection.host}`);
};

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
