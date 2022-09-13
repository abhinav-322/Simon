var buttonColour = ["red", "blue", "yellow", "green"];
var pattern = [];
var userPattern = [];

var randomColour;
var levelNumber = 0;
var started=false;

$(document).on('keypress',function(e) {
    if(!started){
        $("#level-title").text("Level "+levelNumber);
    nextSeq();
    started = true;
    }
});


$(".btn").click(function() {
    userPattern.push(this.id);
    console.log(userPattern);
    makeSound(this.id);
    checkAnswer(userPattern.length-1);
});

function nextSeq(){
    levelNumber++;
    userPattern = [];
    $("#level-title").text("Level "+levelNumber);
randomColour = Math.floor(Math.random()*4 + 1);
console.log(randomColour);
randomChoosenColour();
}

function randomChoosenColour(){
    var nextColour = buttonColour[randomColour-1];
    pattern.push(nextColour);
    console.log(pattern);
    makeSound(nextColour);
}

function makeSound(name){
    // $("#"+name).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#"+name).addClass("pressed");
    setTimeout(function() {
        $("#"+name).removeClass("pressed");
    },50);
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function checkAnswer(currentLevel) {

    if (pattern[currentLevel] === userPattern[currentLevel]) {
      if (userPattern.length === pattern.length){
        setTimeout(function () {
          nextSeq();
        }, 1000);
      }
    } else {
      makeSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function startOver() {
    levelNumber = 0;
    pattern = [];
    started = false;
  }