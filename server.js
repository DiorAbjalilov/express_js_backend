const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const books = [
  { page: 123, name: "diyor" },
  { page: 13, name: "Abjalilov" },
  { page: 116, name: "abdi" },
];
app.get("/", (req, res) => {
  res.send("Hello");
});
app.get("/about", (req, res) => {
  res.send(JSON.stringify(books));
});

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
