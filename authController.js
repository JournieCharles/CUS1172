const fs = require("fs");
const path = require("path");
const userFile = path.join(__dirname, "../data/users.json");

function loadUsers() {
  if (!fs.existsSync(userFile)) return [];
  return JSON.parse(fs.readFileSync(userFile));
}

function saveUsers(users) {
  fs.writeFileSync(userFile, JSON.stringify(users, null, 2));
}

exports.getRegister = (req, res) => {
  res.render("register", { error: null });
};

exports.postRegister = (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return res.render("register", { error: "All fields are required." });
  }
  const users = loadUsers();
  if (users.find((u) => u.email === email)) {
    return res.render("register", { error: "Email already registered." });
  }
  users.push({ email, name, password });
  saveUsers(users);
  res.render("account_created", { email });
};

exports.getLogin = (req, res) => {
  res.render("login", { error: null });
};

exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  const users = loadUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.render("login", { error: "Incorrect credentials." });
  }
  req.session.user = { email: user.email, name: user.name };
  res.redirect("/video/dashboard/all");
};