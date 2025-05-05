// server.js

const express = require('express');
const app = express();
const { user_data } = require('./json_dataset');

// Enable CORS for local testing from browser
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3000;

// Route to get all quizzes
app.get('/api/quizzes', (req, res) => {
  res.json(user_data.quizzes);
});

// Route to get one specific question by ID
app.get('/api/progfundamentals_questions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const question = user_data.progfundamentals_questions.find(q => q.id === id);

  if (question) {
    res.json(question);
  } else {
    res.status(404).json({ error: "Question not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
