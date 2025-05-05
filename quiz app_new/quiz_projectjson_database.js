// json_dataset.js

const user_data = {
    quizzes: [
      { id: "progfundamentals", title: "Programming Fundamentals" }
    ],
    progfundamentals_questions: [
      {
        id: 1,
        text: "What is the output of `print(3 * '7')` in Python?",
        options: ["21", "777", "Error", "3*7"],
        correct: "777",
        explanation: "Python repeats the string: '7' * 3 becomes '777'."
      },
      {
        id: 2,
        text: "Which JavaScript keyword declares a constant?",
        options: ["var", "let", "const", "final"],
        correct: "const",
        explanation: "`const` is used for constant values in JavaScript."
      },
      {
        id: 3,
        text: "What is the place value of the first 1 in binary 10101?",
        options: ["2 (fours)", "4 (sixteens)", "3 (eights)", "1 (twos)"],
        correct: "4 (sixteens)",
        explanation: "The leftmost 1 is at position 4: 2⁴ = 16."
      }
    ]
  };
  
  module.exports = { user_data };
  