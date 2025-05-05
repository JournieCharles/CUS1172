const express = require("express");
const session = require("express-session");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "resources")));
app.use(
  session({
    secret: "fifa2022secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use("/auth", authRoutes);
app.use("/video", videoRoutes);

app.get("/", (req, res) => {
  res.redirect("/auth/login");
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
