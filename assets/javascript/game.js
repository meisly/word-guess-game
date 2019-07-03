
$("#help-btn").click(function(){
    $(".game").toggleClass("hidden");
  });
  $("#quit-btn").click(function () {
        window.location = "http://www.google.com";
  });


let wordBank = ["main", "heights","holcombe","home"];



let livesRemaining = 9;
let level = -1;


function newLevel () {
    level++;
    guessesRemaining = 6;
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
    document.getElementById("game-state").innerHTML = "";
}


document.getElementById("help-btn").onclick = function () {
    newLevel();    
}

document.getElementById("next-lvl").onclick = function () {
    newLevel();
}


document.onkeyup = function(event) {
    if (level ===-1) {
        return;
    }
    console.log(event.key);
    if (event.keyCode === 13 && !document.getElementById("next-lvl").classList.contains("hidden")) {
        document.getElementById("next-lvl").click();
    }
    if (event.key === "ArrowDown") {
        guessesRemaining = 0;
        livesRemaining = 0;
        
    }
    else if (event.keyCode < 65 || event.keyCode > 90) {
        return;
    }

    var userGuess = event.key.toLowerCase();
            
    if (lettersGuessed.includes(userGuess)) {
        
    }

    else if (word.includes(userGuess)) {
        var guessIndex = word.indexOf(userGuess);
        var pos = -1;
        while (word.includes(userGuess) && word.indexOf(userGuess, pos + 1) !== -1) {
            pos = word.indexOf(userGuess, pos +1)
            blanks[pos] = userGuess;
            document.getElementById("word").innerHTML = blanks.join(" ");
        }
        lettersGuessed = lettersGuessed.concat([userGuess]);

    }

    else {
        
        guessesRemaining = guessesRemaining -1;
        document.getElementById("guesses-remaining").innerHTML = "You have " + guessesRemaining + " guesses remaining";
        lettersGuessed = lettersGuessed.concat([userGuess]);
    }
    

    document.getElementById("letters-guessed").innerHTML = "You have already guessed: " + lettersGuessed;
    
    if (blanks.join("") === word) {

        if (level === wordBank.length - 1){
            document.getElementById("game-state").innerHTML = "Congratulations! You helped Smoosh make it home safely.";

        }
        else {
            document.getElementById("game-state").innerHTML = "Congratulations! You have beaten the level and helped Smoosh get closer to home.";
            document.getElementById("next-lvl").classList.remove("hidden");
        }
    }
    
    if (guessesRemaining === 0) {
        livesRemaining--;
        guessesRemaining = 6;
        alert("Oh no, Smoosh didn't make it home before dark and has expired.  Good thing cats have 9 lives")
        document.getElementById("lives-remaining").innerHTML = "You have " + livesRemaining + " lives remaining";
        document.getElementById("guesses-remaining").innerHTML = "You have " + guessesRemaining + " guesses remaining";

    }
    if (livesRemaining === 0) {
        document.getElementById("game-state").innerHTML = "Uh-oh, I guess even cats can't live forever.";
        document.getElementById("game-instructions").classList.add("hidden");
        document.getElementById("game-state-pic-1").classList.add("hidden");
        document.getElementById("game-play-info").classList.add("hidden");
        document.getElementById("lost-img").classList.remove("hidden");
        
    }
}

