const colorNames = [
  "Green",
  "Blue",
  "Yellow",
  "Purple",
  "Orange",
  "Pink",
  "Brown",
  "Gray",
  "Cyan",
  "Magenta",
  "Lime",
  "Teal",
  "Indigo",
  "Maroon",
  "Olive",
  "Navy",
  "Coral",
  "Gold",
  "Silver",
  "Beige",
  "Turquoise",
  "Lavender",
  "Salmon",
  "Khaki",
  "Plum",
  "Tomato",
  "Orchid",
  "Chocolate",
  "Crimson",
  "DarkCyan",
  "DarkMagenta",
  "DarkOrange",
  "DarkOrchid",
  "DarkSalmon",
  "Tan",
  "Thistle",
  "Violet",
  "Wheat",
];

const colorMap = {
  Green: "#00FF00",
  Blue: "#0000FF",
  Yellow: "#FFFF00",
  Purple: "#800080",
  Orange: "#FFA500",
  Pink: "#FFC0CB",
  Brown: "#A52A2A",
  Gray: "#808080",
  Cyan: "#00FFFF",
  Magenta: "#FF00FF",
  Lime: "#00FF00",
  Teal: "#008080",
  Indigo: "#4B0082",
  Maroon: "#800000",
  Olive: "#808000",
  Navy: "#000080",
  Coral: "#FF7F50",
  Gold: "#FFD700",
  Silver: "#C0C0C0",
  Beige: "#F5F5DC",
  Turquoise: "#40E0D0",
  Lavender: "#E6E6FA",
  Salmon: "#FA8072",
  Khaki: "#F0E68C",
  Plum: "#DDA0DD",
  Tomato: "#FF6347",
  Orchid: "#DA70D6",
  Chocolate: "#D2691E",
  Crimson: "#DC143C",
  DarkCyan: "#008B8B",
  DarkMagenta: "#8B008B",
  DarkOrange: "#FF8C00",
  DarkOrchid: "#9932CC",
  DarkSalmon: "#E9967A",
  Tan: "#D2B48C",
  Thistle: "#D8BFD8",
  Violet: "#EE82EE",
  Wheat: "#F5DEB3",
};

let correctAnswers = 0;
let totalQuestions = 0;

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colorNames.length);
  return colorNames[randomIndex];
}

function mixColors(color1, color2) {
  const hex1 = colorMap[color1];
  const hex2 = colorMap[color2];

  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);

  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);

  const mixedR = Math.round((r1 + r2) / 2);
  const mixedG = Math.round((g1 + g2) / 2);
  const mixedB = Math.round((b1 + b2) / 2);

  return `rgb(${mixedR}, ${mixedG}, ${mixedB})`;
}

function generateQuestion() {
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const mixedColor = mixColors(color1, color2);

  const correctAnswer = mixedColor;
  const wrongAnswer = mixColors(getRandomColor(), getRandomColor());

  const options = [correctAnswer, wrongAnswer];
  options.sort(() => Math.random() - 0.5);

  // Display the two base colors with their names
  document.getElementById("color1").style.backgroundColor = colorMap[color1];
  document.getElementById("color1").innerText = color1;
  document.getElementById("color2").style.backgroundColor = colorMap[color2];
  document.getElementById("color2").innerText = color2;

  // Display the options with their colors (no text)
  document.getElementById("option1").style.backgroundColor = options[0];
  document.getElementById("option1").innerText = "";
  document.getElementById("option2").style.backgroundColor = options[1];
  document.getElementById("option2").innerText = "";

  // Set up event listeners for the options
  document.getElementById("option1").onclick = () =>
    checkAnswer(options[0], correctAnswer);
  document.getElementById("option2").onclick = () =>
    checkAnswer(options[1], correctAnswer);
}

function checkAnswer(selectedColor, correctColor) {
  const resultElement = document.getElementById("result");

  totalQuestions++;

  if (selectedColor === correctColor) {
    correctAnswers++;
    resultElement.innerText = "Correct!";
    resultElement.className = "correct";
  } else {
    resultElement.innerText = "Incorrect!";
    resultElement.className = "incorrect";
  }

  setTimeout(() => {
    resultElement.innerText = "";
    resultElement.className = "";
    generateQuestion();
  }, 1000);
}

function showResults() {
  const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
  document.getElementById(
    "result"
  ).innerText = `You answered ${correctAnswers} out of ${totalQuestions} questions correctly (${percentage}%).`;
  document.getElementById("leave-button").style.display = "none";
  document.getElementById("restart-button").style.display = "inline-block";
}

function restartQuiz() {
  correctAnswers = 0;
  totalQuestions = 0;
  document.getElementById("result").innerText = "";
  document.getElementById("leave-button").style.display = "inline-block";
  document.getElementById("restart-button").style.display = "none";
  generateQuestion();
}

document.getElementById("leave-button").addEventListener("click", showResults);
document
  .getElementById("restart-button")
  .addEventListener("click", restartQuiz);

generateQuestion();
