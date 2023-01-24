var scoreContainer = document.getElementById("score-number");
var scoreMax = document.getElementById("score-max");
var maxNumber = document.getElementById("max-number");

// Initialize the score to zero
var score = 0;
var max = 0;

// get max-number and show in span id="js-show-max-number"
maxNumber.addEventListener("change", function () {
  document.getElementById("js-show-max-number").innerHTML = maxNumber.value;
});

function generateMultiplicationProblem() {
  // Generate two random numbers between 1 and maxNumber
  var num1 = Math.floor(Math.random() * maxNumber.value) + 1;
  var num2 = Math.floor(Math.random() * 10) + 1;

  // Calculate the result of the multiplication problem
  var result = num1 * num2;

  // Return the problem and the result
  return { problem: num1 + " x " + num2 + " = ?", result: result };
}

// Get the element where the problem will be displayed
var problemContainer = document.getElementById("problem");

// Generate a new multiplication problem
var problem = generateMultiplicationProblem();

// Display the problem
problemContainer.innerHTML = problem.problem;

//Get the buttons where the options will be displayed
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var option4 = document.getElementById("option4");

// Generate two incorrect answers
var incorrectAnswer1 = problem.result + Math.floor(Math.random() * 2) + 1;
var incorrectAnswer2 = problem.result - Math.floor(Math.random() * 2) - 1;
var incorrectAnswer3 = problem.result - Math.floor(Math.random() * 2) - 2;
var incorrectAnswer4 = problem.result - Math.floor(Math.random() * 2) + 2;

var incorrectAnswers = [incorrectAnswer1, incorrectAnswer2, incorrectAnswer3];

// Assign the correct answer to one button randomly
var buttons = [option1, option2, option3, option4];
var randomButton = buttons[Math.floor(Math.random() * buttons.length)];
randomButton.innerHTML = problem.result;

// Assign the incorrect answers to the remaining buttons
for (var i = 0; i < buttons.length; i++) {
  if (buttons[i] !== randomButton) {
    if (!incorrectAnswer1) {
      buttons[i].innerHTML = incorrectAnswer2;
      incorrectAnswer1 = null;
    } else {
      buttons[i].innerHTML = incorrectAnswer1;
      incorrectAnswer1 = null;
    }
  }
}

// Generate four incorrect answers
var incorrectAnswers = [
  problem.result + Math.floor(Math.random() * 2) + 1,
  problem.result - Math.floor(Math.random() * 2) - 1,
  problem.result + Math.floor(Math.random() * 4) + 1,
  problem.result - Math.floor(Math.random() * 4) - 1
];

// Assign the correct answer to one button randomly
var randomButton = buttons[Math.floor(Math.random() * buttons.length)];
randomButton.innerHTML = problem.result;

// remove one incorrect answers
incorrectAnswers.splice(Math.floor(Math.random() * incorrectAnswers.length), 1);

// Assign the incorrect answers to the remaining buttons
for (var i = 0; i < buttons.length; i++) {
  if (buttons[i] !== randomButton) {
    if (incorrectAnswers.length > 0) {
      buttons[i].innerHTML = incorrectAnswers.pop();
    }
  }
}


//Get the buttons where the options will be displayed
var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var option4 = document.getElementById("option4");

// Add an event listener to each button
option1.addEventListener("click", checkAnswer);
option2.addEventListener("click", checkAnswer);
option3.addEventListener("click", checkAnswer);
option4.addEventListener("click", checkAnswer);



function checkAnswer(e) {
  // Get the button that was clicked
  var button = e.target;

  // Check if the button's text matches the correct answer
  if (button.innerHTML == problem.result) {
    score++;
    scoreContainer.innerHTML = score;

    if (score > max) {
      max = score;
      scoreMax.innerHTML = max;
    }

    // If the answer is correct, generate a new problem
    problem = generateMultiplicationProblem();
    problemContainer.innerHTML = problem.problem;

    // Generate two incorrect answers
    var incorrectAnswer1 = problem.result + Math.floor(Math.random() * 2) + 1;
    var incorrectAnswer2 = problem.result - Math.floor(Math.random() * 2) - 1;
    var incorrectAnswer3 = problem.result - Math.floor(Math.random() * 2) - 2;
    var incorrectAnswer4 = problem.result - Math.floor(Math.random() * 2) + 2;
    var incorrectAnswers = [incorrectAnswer1, incorrectAnswer2, incorrectAnswer3];

    // Assign the correct answer to one button randomly
    var randomButton = buttons[Math.floor(Math.random() * buttons.length)];
    randomButton.innerHTML = problem.result;
    // Assign the incorrect answers to the remaining buttons
    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i] !== randomButton) {
        if (!incorrectAnswer1) {
          buttons[i].innerHTML = incorrectAnswer2;
          incorrectAnswer1 = null;
        } else {
          buttons[i].innerHTML = incorrectAnswer1;
          incorrectAnswer1 = null;
        }
      }

      // Generate four incorrect answers
      var incorrectAnswers = [
        problem.result + Math.floor(Math.random() * 2) + 1,
        problem.result - Math.floor(Math.random() * 2) - 1,
        problem.result + Math.floor(Math.random() * 4) + 1,
        problem.result - Math.floor(Math.random() * 4) - 1
      ];

      // Assign the correct answer to one button randomly
      var randomButton = buttons[Math.floor(Math.random() * buttons.length)];
      randomButton.innerHTML = problem.result;

      // remove one incorrect answers
      incorrectAnswers.splice(Math.floor(Math.random() * incorrectAnswers.length), 1);

      // Assign the incorrect answers to the remaining buttons
      for (var i = 0; i < buttons.length; i++) {
        if (buttons[i] !== randomButton) {
          if (incorrectAnswers.length > 0) {
            buttons[i].innerHTML = incorrectAnswers.pop();
          }
        }
      }
      // reset the color of buttons 
      resetButtonColors();
    }
  } else {

    // If the answer is incorrect, reset the score
    score = 0;
    scoreContainer.innerHTML = score;
    // If the answer is incorrect, color the button red
    button.style.backgroundColor = "red";
  }
}

function resetButtonColors() {
  var buttons = document.getElementsByTagName("button");
  for (var i = 0; i < buttons.length; i++) {
    //buttons[i].style.backgroundColor = "white";
    //remove style from button
    buttons[i].removeAttribute("style");
  }
}

document.getElementById("js-setting").addEventListener("click", function () {
  toggleSetting();
});
//if press js-save button then save to local storage and reload page and toggle display 
document.getElementById('js-save').addEventListener('click', function () {
  localStorage.setItem('koniec', document.getElementById('max-number').value);
  toggleSetting();
  //      location.reload();
});


function toggleSetting() {
  var setting = document.getElementById("js-nastaveni");
  var counts = document.getElementById("js-pocty");
  if (setting.style.display === "none") {
    setting.style.display = "flex";
    counts.style.display = "none";
  } else {
    setting.style.display = "none";
    counts.style.display = "flex";
  }
}
