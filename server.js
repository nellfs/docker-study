const fs = require("fs").promises;
const exists = require("fs").exists;
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use("/feedback", express.static("feedback"));

console.log("Test");

fs.writeFile("feedback/mynewfile3.txt", "Hello content!", function (err) {
  if (err) throw err;
  console.log("Saved!");
});

// const tt = path.join(__dirname, "temp", "temp" + ".txt");

// console.log(tt);
// fs.writeFile(tt, "temped!");

// const tf = path.join(__dirname, "feedback", "feedback" + ".txt");

// console.log(tf);
// fs.writeFile(tf, "feedbacked!");

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "pages", "feedback.html");
  res.sendFile(filePath);
});

app.get("/exists", (req, res) => {
  const filePath = path.join(__dirname, "pages", "exists.html");
  res.sendFile(filePath);
});

app.post("/create", async (req, res) => {
  const title = req.body.title;
  const content = req.body.text;

  const adjTitle = title.toLowerCase();

  const tempFilePath = path.join(__dirname, "temp", adjTitle + ".txt");
  const finalFilePath = path.join(__dirname, "feedback", adjTitle + ".txt");

  console.log("Working!");

  await fs.writeFile(tempFilePath, content);
  exists(finalFilePath, async (exists) => {
    if (exists) {
      res.redirect("/exists");
    } else {
      await fs.copyFile(tempFilePath, finalFilePath);
      await fs.unlink(tempFilePath);
      res.redirect("/");
    }
  });
});

app.listen(8080);
