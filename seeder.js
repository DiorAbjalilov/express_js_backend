const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Models
const Poster = require("./models/posterModel");
const User = require("./models/userModule");

// connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);
const postres = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/posters.json`, "utf-8")
);

// Import
const importData = async () => {
  try {
    await User.create(users);
    await Poster.create(postres);

    console.log("Data imported to DB");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
  } catch (err) {
    console.log(err);
  }
};
