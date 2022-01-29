const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const Handlebars = require("handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");
const helmet = require("helmet");
const compression = require("compression");
const dotenv = require("dotenv");
const helpers = require("./utils/hbsHelpers");
const connectDB = require("./config/db");

// Env variables
dotenv.config();

// Connecting to database
connectDB();

const app = express();

// Initialize session store
const store = new MongoStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register handlebars helpers
helpers(Handlebars);

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(flash());
app.use(helmet());
app.use(compression());

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// Initialize template engine (handlebars)
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

// Initialize routes
app.use("/", require("./routes/homeRoutes"));
app.use("/posters", require("./routes/postersRoutes"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/profile", require("./routes/profileRouters"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
