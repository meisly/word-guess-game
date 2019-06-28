
$("#help-btn").click(function(){
    $(".game").toggleClass("hidden");
  });
  $("#quit-btn").click(function () {
        window.location = "http://www.google.com";
  });

//   Game functions needed
// array of words => word bank, function to pick a word from the array, function to display blanks for the word
// array to hold guesses, keyboard listener, function to check if key is in word
// functions to do something pretty when you guess wrong

let wordBank = ["home","main", "apartment","fish market","holcombe boulevard"];


let guessesRemaining = 6;
let livesRemaining = 9;
let level = -1;
let word = wordBank[level];
let blanks = [];

function newLevel () {
    level++;
    word = wordBank[level];
    blanks = [];
    lettersGuessed = []
    for (var counter = 0; counter < word.length; counter++) {
        blanks = blanks.concat("__ "); 
    }
    document.getElementById("word").innerHTML = blanks.join(" ");
    document.getElementById("letters-guessed").innerHTML = "You have already guessed: " +lettersGuessed;
    document.getElementById("guesses-remaining").innerHTML = "You have " + guessesRemaining + " guesses remaining";
    document.getElementById("lives-remaining").innerHTML = "You have " + livesRemaining + " lives remaining";


    document.getElementById("next-lvl").classList.add("hidden");
}


document.getElementById("help-btn").onclick = function () {
    newLevel();    
}

document.onkeyup = function(event) {
    if (level ===-1) {
        return;
    }
    var userGuess = event.key;
            
    if (lettersGuessed.includes(userGuess)) {
        
    }
    else if (word.includes(userGuess)) {
        var pos = word.indexOf(userGuess);
        blanks[pos] = userGuess;
        document.getElementById("word").innerHTML = blanks.join(" ");
        lettersGuessed = lettersGuessed.concat([userGuess]);
    }
    else {
        
        guessesRemaining = guessesRemaining -1;
        document.getElementById("guesses-remaining").innerHTML = "You have " + guessesRemaining + " lives remaining";
        lettersGuessed = lettersGuessed.concat([userGuess]);
    }
    
    document.getElementById("letters-guessed").innerHTML = "You have already guessed: " + lettersGuessed;

    if (blanks.join("") === word) {
        document.getElementById("game-state").innerHTML = "Congratulations! You have beat level one and helped Smoosh get closer to home. Continue to level 2";
        document.getElementById("next-lvl").classList.remove("hidden");
    }
}