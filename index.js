// catching my html element:
var userName = document.querySelector(".startPage .name"),
  lvl = document.querySelector(".startPage .level"),
  startBtn = document.querySelector(".startBtn"),
  entredName = document.querySelector(".info .name span"),
  chosenLvl = document.querySelector(".info .lvl span"),
  upcomingWord = document.querySelector(".upcomingWord"),
  currentWord = document.querySelector(".currentWord"),
  inputWord = document.querySelector(".typing .input"),
  timer = document.querySelector(".timer"),
  finishedWord = document.querySelector(".counter .done"),
  totaleWord = document.querySelector(".counter .totale");
// --------------------------------------------------------------------
// ----------------initialisation de levels and words list and object--------
// --------------------------------------------------------------------------
const allWords = [
  "Men",
  "Ken",
  "top",
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Setting Levels
const lvls = {
  Easy: 5,
  Normal: 5,
  Hard: 5,
};
let myKeys = Object.keys(lvls);
function displayingLevel() {
  myKeys.forEach((ele) => {
    let opt = document.createElement("option");
    opt.value = ele;
    document.querySelector("datalist").appendChild(opt);
  });
}
displayingLevel();
let wBOL = [];
let myTime;
inputWord.onpaste = function () {
  return false;
};
// --------------------------------------------------------------------------
// ----------------------- Handling the start page------------------------------
// -------------------------------------------------------------------------
startBtn.addEventListener("click", function () {
  if (userName.value === null || userName.value === "") {
    entredName.innerHTML = "Unkown";
  } else {
    entredName.innerHTML = userName.value.trim();
  }
  if (lvl.value === null || lvl.value === "" || !myKeys.includes(lvl.value)) {
    chosenLvl.innerHTML = "Easy";
  } else {
    chosenLvl.innerHTML = lvl.value;
  }
  this.parentElement.remove();
  inputWord.focus();
  choosingWord(`${chosenLvl.innerHTML}`);
  genWord();
  playGame();
});
// --------------------------------
function choosingWord(mychoice) {
  if (mychoice == "Easy") {
    myTime = lvls[mychoice];
    allWords.forEach((ele) => {
      if (ele.length <= 3) {
        wBOL.push(ele);
      }
    });
  } else if (mychoice == "Normal") {
    myTime = lvls[mychoice];
    allWords.forEach((ele) => {
      if (ele.length > 4 && ele.length <= 7) {
        wBOL.push(ele);
      }
    });
  } else {
    allWords.forEach((ele) => {
      myTime = lvls[mychoice];
      if (ele.length > 7) {
        wBOL.push(ele);
      }
    });
  }
  totaleWord.innerText = wBOL.length;
}
function genWord() {
  let myCurrentWordIndex = Math.floor(Math.random() * wBOL.length),
    myCurrentWord = wBOL[myCurrentWordIndex];
  wBOL.splice(myCurrentWordIndex, 1);
  currentWord.innerHTML = myCurrentWord;
  wBOL.forEach((ele) => {
    let mydiv = document.createElement("div");
    mydiv.innerText = ele;
    upcomingWord.appendChild(mydiv);
  });
  timer.innerHTML = myTime;
}
function playGame() {
  let start = setInterval(function () {
    timer.innerHTML--;
    if (timer.innerHTML == 0) {
      clearInterval(start);
      if (inputWord.value.toLocaleLowerCase() == currentWord.innerHTML.toLocaleLowerCase()) {
        if (wBOL.length !== 0) {
          ++finishedWord.innerHTML;
          inputWord.value = "";
          upcomingWord.innerHTML = "";
          genWord();
          playGame();
        } else {
          ++finishedWord.innerHTML;
          setTimeout(youWon, 1000);
        }
      } else {
        youLost();
      }
    }
  }, 1000);
}
function youWon() {
  let myDiv = document.createElement("div");
  myDiv.classList.add("startPage");
  let myParagraphe = document.createElement("p");
  myParagraphe.classList.add("welcoming");
  myParagraphe.innerText = `Congratz you won the game you scored ${finishedWord.innerHTML} out of ${totaleWord.innerHTML} of the ${chosenLvl.innerText} level`;
  let myBtn = document.createElement("button");
  myBtn.classList.add("startBtn");
  myBtn.innerText = "play again";
  myBtn.addEventListener("click", () => {
    window.location.reload();
  });
  myDiv.appendChild(myParagraphe);
  myDiv.appendChild(myBtn);
  document.querySelector(".wonAudio").play();
  document.body.appendChild(myDiv);
}
function youLost() {
  let myDiv = document.createElement("div");
  myDiv.classList.add("startPage");
  let myParagraphe = document.createElement("p");
  myParagraphe.classList.add("welcoming");
  myParagraphe.innerText = `sadly you lost the game you scored ${finishedWord.innerHTML} out of ${totaleWord.innerHTML} of the ${chosenLvl.innerText} level`;
  let myBtn = document.createElement("button");
  myBtn.classList.add("startBtn");
  myBtn.innerText = "play again";
  myBtn.addEventListener("click", () => {
    window.location.reload();
  });
  myDiv.appendChild(myParagraphe);
  myDiv.appendChild(myBtn);
  document.querySelector(".lostAudio").play();
  document.body.appendChild(myDiv);
}
