// game value.....................

let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessLeft = 3;

//   UI elements.....................

const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  message = document.querySelector(".message"),
  guessInput = document.querySelector("#guess-input");

//   assign UI min and max................
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener.....................
game.addEventListener("mousedown", function (e) {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// eventListener.........................
guessBtn.addEventListener("click", function () {
  let guess = parseInt(guessInput.value);

  //   validate...................
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`please guess a number between ${min} and ${max}`, "red");
  }

  //   check if won....................

  if (guess === winningNum) {
    // disable input........
    // guessInput.disabled = "true";
    // guessInput.style.borderColor = "green";
    // setMessage(`${winningNum} is correct! YOU WIN.`, "green");
    gameOver(true, `${winningNum} is correct! YOU WIN.`);
  } else {
    // wrong number...........
    guessLeft -= 1;
    if (guessLeft === 0) {
      //   guessInput.disabled = "true";
      //   guessInput.style.borderColor = "red";
      //   setMessage(
      //     `${guess} is not correct! YOU LOST. The correct number was ${winningNum}`,
      //     "red"
      //   );
      gameOver(
        false,
        `${guess} is not correct! YOU LOST. The correct number was ${winningNum}`
      );
    } else {
      guessInput.style.borderColor = "red";
      guessInput.value = "";
      setMessage(
        `${guess} is not correct, you have ${guessLeft} guesses left`,
        "red"
      );
    }
  }
});

// get winning number........................
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  guessInput.disabled = "true";
  guessInput.style.borderColor = "green";
  message.style.color = color;
  setMessage(msg);

  // play again...............

  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}
