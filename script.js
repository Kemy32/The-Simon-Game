var gamePattern = new Array();
var userClickedPattern = new Array();

var heading = $("#level-title");
var level = 1;
var start = false;

var buttonColors = ["red", "blue", "green", "yellow"];

$(document).on("keydown", function (event) {
    if (event.key === "a" && !start) {
        nextSequence();

        start = true;
    }
});


$(".btn").on("click", handler);

function handler(event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    const error = checkPattern();

    if (gamePattern.length == userClickedPattern.length && !error) {
        nextSequence();
    }
}

function nextSequence() {

    heading.text("Level " + level);
    level++;

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    var selectedButton = $("#" + randomChosenColor);
    selectedButton.fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

    userClickedPattern = [];
}

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {

    var userClickedBtn = $("#" + currentColor);
    userClickedBtn.addClass("pressed");

    setTimeout(() => {
        userClickedBtn.removeClass("pressed");
    }, 100);
}

function checkPattern() {
    for (let i = 0; i < userClickedPattern.length; i++) {
        if (gamePattern[i] != userClickedPattern[i]) {
            wrongPattern();
            return true;
        }

    }
    return false;
}


function wrongPattern() {

    $("body").addClass("game-over");
    heading.text("Game over!");
    playSound("wrong");

    // setTimeout(function () {
    //     $("body").removeClass("game-over");
    // }, 200)

    setTimeout(function () {
        location.reload();
    }, 500);
}