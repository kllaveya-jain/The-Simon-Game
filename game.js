var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = new Array();
userClickedPattern = new Array();
count = 0;
var level = 1;

//generates the next sequence

function nextSequence () {
   userClickedPattern = new Array();
   $("h1").text("Level " + level++);
   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   console.log(randomChosenColour);
   $("." + randomChosenColour).fadeOut(100);
   playSound(randomChosenColour);
   $("." + randomChosenColour).fadeIn(100);
}

// to start the game

$(document).keypress(function () {
   if (level === 1) {
      nextSequence();
   }
});

// to detect the button pressed by the player

$(".btn").click(function (e) {
   var userChosenColour = e.target.id;
   userClickedPattern.push(userChosenColour);
   console.log(userClickedPattern);
   playSound(e.target.id);
   animatePress(userChosenColour);
   count++;
   checkAnswer();
   console.log(count);
});

// adds animations as the user presses the button

function animatePress(currentColour) {
   $("#" + currentColour).addClass("pressed");
   setTimeout(function () {$("#" + currentColour).removeClass("pressed");}, 100);
}

// audio generating section

function playSound(colour) {
   switch(colour) {
      case "red":
         var audio = new Audio("./sounds/" + colour + ".mp3");
         break;
         case "blue":
         var audio = new Audio("./sounds/" + colour + ".mp3");
         break;
         case "green":
         var audio = new Audio("./sounds/" + colour + ".mp3");
         break;
      case "yellow":
         var audio = new Audio("./sounds/" + colour + ".mp3");
         break;
      default:
         var audio = new Audio("./sounds/wrong.mp3");
   }
   audio.play();
}

// to check the answer

function checkAnswer() {
   var correct = true;
   console.log(correct);
   console.log(gamePattern);
   console.log(userClickedPattern);
   for (var i = 0; i < userClickedPattern.length; i++) {
      if (userClickedPattern[i] !== gamePattern[i]) {
         correct = false;
         break;
      }
   }
   if (correct !== true) {
      playSound(1);
      $("body").addClass("game-over");
      setTimeout(function () {$("body").removeClass("game-over");}, 100);
      $("h1").text("Game Over, Press Any Key to Restart");
      level = 1;
      count = 0;
      gamePattern = new Array();
   }
   else {
      if (count === (level - 1)) {
         count = 0;
         setTimeout(nextSequence, 1000);
      }
   }
}