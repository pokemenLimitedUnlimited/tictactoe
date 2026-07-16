const body = document.querySelector("body");
const playerTurnDisplay = document
  .getElementById("playerTurn")
  .querySelector("h1");

const winnerDisplay = document.getElementById("Winner").querySelector("h1");

var plyrTrnLetter = playerTurnDisplay.closest("section").querySelector("i");

const winnerLetter = winnerDisplay.closest("section").querySelector("i");
console.log(winnerLetter);

function checkWinFunc() {
  for (let i = 0; i < 3; i++) {
    let checkWin = [];
    const row = document.querySelectorAll(`.row${i + 1}`);
    for (let j = 0; j < row.length; j++) {
      checkWin.push(row[j].textContent);
    }
    //console.log(checkWin);
    if (checkWin[0] === "X" && checkWin[1] === "X" && checkWin[2] === "X") {
      //console.log("X Wins");
      return "X";
    } else if (
      checkWin[0] === "O" &&
      checkWin[1] === "O" &&
      checkWin[2] === "O"
    ) {
      //console.log("O Wins");
      return "O";
    }

    checkWin = [];
    const col = document.querySelectorAll(`.col${i + 1}`);
    for (let j = 0; j < col.length; j++) {
      checkWin.push(col[j].textContent);
    }
    //console.log(checkWin);
    if (checkWin[0] === "X" && checkWin[1] === "X" && checkWin[2] === "X") {
      //console.log("X Wins");
      return "X";
    } else if (
      checkWin[0] === "O" &&
      checkWin[1] === "O" &&
      checkWin[2] === "O"
    ) {
      //console.log("O Wins");
      return "O";
    }
  }
  let checkWin = [];
  const slots = {};
  for (let i = 0; i < 9; i++) {
    slots[`slot${i + 1}`] = document.getElementById(`slot${i + 1}`);
  }
  if (
    slots.slot1.textContent === "O" &&
    slots.slot5.textContent === "O" &&
    slots.slot9.textContent === "O"
  ) {
    //console.log("O Wins");
    return "O";
  } else if (
    slots.slot1.textContent === "X" &&
    slots.slot5.textContent === "X" &&
    slots.slot9.textContent === "X"
  ) {
    //console.log("X Wins");
    return "X";
  }

  if (
    slots.slot3.textContent === "O" &&
    slots.slot5.textContent === "O" &&
    slots.slot7.textContent === "O"
  ) {
    //console.log("O Wins");
    return "O";
  } else if (
    slots.slot3.textContent === "X" &&
    slots.slot5.textContent === "X" &&
    slots.slot7.textContent === "X"
  ) {
    //console.log("X Wins");
    return "X";
  }
}

winnerDisplay.style.display = "none";
playerTurnDisplay.style.display = "";

var playerTurn = 0; //0 = X, 1 = O
var selectable = 1;
var scrolledToTop = 0;

body.addEventListener("click", (event) => {
  const grid = document.getElementById("grid");

  if (event.target.id === "resetBtn") {
    //console.log("clicked");
    const allSlots = document.getElementById("grid").querySelectorAll("button");
    for (let i = 0; i < allSlots.length; i++) {
      allSlots[i].textContent = "";
      allSlots[i].classList.remove("occupied");
      allSlots[i].classList.remove("X");
      allSlots[i].classList.remove("O");
    }
    playerTurnDisplay.innerHTML = `<i class="X">X</i> Turn`;
    plyrTrnLetter = playerTurnDisplay.querySelector("i");
    plyrTrnLetter.textContent = "X";
    plyrTrnLetter.classList.remove("O");
    plyrTrnLetter.classList.add("X");

    winnerLetter.classList.remove("X", "O");

    playerTurn = 0;
    winnerDisplay.style.display = "none";
    playerTurnDisplay.style.display = "";
    selectable = 1;
    scrolledToTop = 0;
    window.scrollTo(0, 0);
  }

  if (grid.contains(event.target)) {
    const btn = event.target.closest("button");
    if (!btn) return;

    if (
      playerTurn === 0 &&
      !btn.classList.contains("occupied") &&
      selectable === 1
    ) {
      btn.textContent = "X";
      btn.classList.remove("O");
      btn.classList.add("X");
      btn.classList.add("occupied");
      playerTurn = 1;
      //console.log(playerTurn);
      plyrTrnLetter.textContent = "O";
      plyrTrnLetter.classList.remove("X");
      plyrTrnLetter.classList.add("O");
    } else if (
      playerTurn === 1 &&
      !btn.classList.contains("occupied") &&
      selectable === 1
    ) {
      btn.textContent = "O";
      btn.classList.remove("X");
      btn.classList.add("O");
      btn.classList.add("occupied");
      playerTurn = 0;
      //console.log(playerTurn);
      plyrTrnLetter.textContent = "X";
      plyrTrnLetter.classList.remove("O");
      plyrTrnLetter.classList.add("X");
    }

    const checkWinResults = checkWinFunc();

    if (checkWinResults !== undefined) {
      playerTurnDisplay.style.display = "none";
      winnerDisplay.style.display = "";
      winnerLetter.textContent = checkWinResults;
      winnerLetter.classList.add(`${checkWinResults}`);
      selectable = 0;
      if (scrolledToTop === 0) {
        window.scrollTo(0, 0);
      } else {
        document.getElementById("resetBtn").scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      scrolledToTop = 1;
    }

    const slots = {};
    for (let i = 0; i < 9; i++) {
      slots[`slot${i + 1}`] = document.getElementById(`slot${i + 1}`);
    }

    var checkDraw = [];

    for (let i = 0; i < 9; i++) {
      if (slots[`slot${i + 1}`].classList.contains("occupied")) {
        checkDraw.push(slots[`slot${i + 1}`]);
      }
    }

    if (checkDraw.length === 9) {
      playerTurnDisplay.textContent = "It's a Draw";
      if (scrolledToTop === 0) {
        window.scrollTo(0, 0);
      } else {
        document.getElementById("resetBtn").scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      scrolledToTop = 1;
    }
  }
});
