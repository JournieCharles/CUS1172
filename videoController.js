const fs = require("fs");
const path = require("path");
const videoFile = path.join(__dirname, "../data/videos.json");

function loadVideos() {
  if (!fs.existsSync(videoFile)) return [];
  return JSON.parse(fs.readFileSync(videoFile));
}

function saveVideos(videos) {
  fs.writeFileSync(videoFile, JSON.stringify(videos, null, 2));
}

exports.getNewVideo = (req, res) => {
  if (!req.session.user) {
    return res.render("login", { error: "You must login to access this content." });
  }
  res.render("new_video", { error: null, success: null });
};

exports.postNewVideo = (req, res) => {
  if (!req.session.user) {
    return res.render("login", { error: "You must login to access this content." });
  }
  const { title, url } = req.body;
  if (!title || !url) {
    return res.render("new_video", { error: "All fields required.", success: null });
  }
  const videos = loadVideos();
  videos.push({ title, url, owner: req.session.user.email });
  saveVideos(videos);
  res.render("new_video", { success: "Video added.", error: null });
};

exports.getDashboard = (req, res) => {
  if (!req.session.user) {
    return res.render("login", { error: "You must login to access this content." });
  }
  const videos = loadVideos();
  const filter = req.params.videofilter;
  let filtered = videos;
  if (filter === "mine") {
    filtered = videos.filter((v) => v.owner === req.session.user.email);
  }
  res.render("dashboard", { videos: filtered, user: req.session.user });
};
