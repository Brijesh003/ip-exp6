import express from "express";
import bodyParser from "body-parser";
import path from "path";
import ejs from "ejs";

const app = express();

const dirname = path.resolve();

app.use(express.static(path.join(dirname, "stylesheets")));
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.get("/", (req, res) => {
  res.sendFile(dirname + "/index.html");
});

app.post("/", (req, res) => {
  var weight = req.body.Weight;
  var height = req.body.Height;
  var bmi = weight / (height * height);

  bmi = bmi.toFixed();

  var category = "";

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (18.5 <= bmi && bmi < 25) {
    category = "Healthy Weight";
  } else if (25 <= bmi && bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obese";
  }
  res.render(path.join(dirname, "result"), { result: bmi, category: category });
});

app.listen(process.env.PORT, () => {
  console.log("port active at " + process.env.PORT);
});
