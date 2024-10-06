const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
require("./configs/db.config");
const { Auth, Job ,JobCategory} = require("./routes/index.routes");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: ["Job Recommendation", "session", "backend"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach((key) => {
      if (typeof req.body[key] === "string") {
        req.body[key] = req.body[key].trim();
      }
    });
  }
  console.log("HTTP method is " + req.method + ", URL -" + req.url);
  next();
});

app.use("/api/v1/auth", Auth);
app.use("/api/v1/job",Job);
app.use("/api/v1/jobCategory",JobCategory);
app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT: ${process.env.PORT}`);
});
