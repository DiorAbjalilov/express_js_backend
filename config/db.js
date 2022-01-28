const mongoose = require("mongoose");

// const connectDB = async () => {
//   const conn = await mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false,
//     useUnifiedTopology: true,
//   });
//   console.log(`MongoDB Connected:${conn.connection.host}`);
// };

const connectDB = async () => {
  try {
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useUnifiedTopology", true);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useFindAndModify", false);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ${conn.connection.host}");
    return;
  } catch (err) {
    process.exit(1);
  }
};
module.exports = connectDB;
