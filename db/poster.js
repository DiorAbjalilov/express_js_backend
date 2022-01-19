const fs = require("fs");
const path = require("path");

const addNewPosterToDB = async (poster) => {
  const data = () => fs.readFileSync(path.join(__dirname, "db.json"), "utf8");
  const posters = JSON.parse(data());
  posters.push(poster);
  fs.writeFile(
    path.join(__dirname, "db.json"),
    JSON.stringify(posters),
    "utf8",
    (err) => {
      if (err) throw err;
    }
  );
  console.log("Data add");
};

const getAllPosters = async () => {
  const data = () => fs.readFileSync(path.join(__dirname, "db.json"), "utf8");
  const posters = JSON.parse(data());
  return posters;
};

const getPosterById = (id) => {
  const data = () => fs.readFileSync(path.join(__dirname, "db.json"), "utf8");
  const posters = JSON.parse(data());
  const poster = posters.find((p) => p.id === id);
  return poster;
};

module.exports = { addNewPosterToDB, getAllPosters, getPosterById };
