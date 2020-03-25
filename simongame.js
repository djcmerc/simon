var blue = document.getElementById('triangle-up');
var green = document.getElementById('triangle-right');
var yellow = document.getElementById('triangle-left');
var red = document.getElementById('triangle-down');
var blueSound = document.getElementById('up-sound');
var redSound = document.getElementById('down-sound');
var yellowSound = document.getElementById('left-sound');
var greenSound = document.getElementById('right-sound');
var startButton = document.getElementById('start-button');
var resetButton = document.getElementById('reset-button');
var gameStart = false;
var level = 1;
var lives = 1;
var score = 0;
var playerTurn = false;
var playerInput = [];
var compInput = [];
var numInputs = 4;
var playerPresses = 0;
var gameSpeed = 750;

startButton.addEventListener("click", function(){
    if (gameStart == false) 
    {
        gameStart = true;
        game();
    }
});

resetButton.addEventListener("click", function(){
    reset();
});

blue.addEventListener("click", function(){
    if (playerTurn)clickColor(0)});
green.addEventListener("click", function(){
    if (playerTurn) clickColor(1)});
yellow.addEventListener("click", function(){
    if (playerTurn) clickColor(2)});
red.addEventListener("click", function(){
    if (playerTurn) clickColor(3)});

function game(){
    playerPresses = 0;
    if (playerTurn == false)
    {
        compInput = new Array(numInputs);
        playerInput = new Array(numInputs);
        for (var i = 0; i < compInput.length; i++)
        {
            compInput[i] = Math.floor(Math.random() * 4);
        }
    
        for (var j = 0; j < compInput.length; j++)
        {
            console.log(compInput[j]);
            setTimeout(clickColor, gameSpeed * j, compInput[j]);
        }
        setTimeout(function(){
            playerTurn = true;
            console.log(playerTurn);
            game();
        }, gameSpeed * numInputs + 250);
    }
}

function clickColor(color){
    if (gameStart == true)
    {    
        if (color === 0) 
        {
            document.getElementById('triangle-up').style.opacity = 0.5;
            blueSound.play();
            if (playerTurn)
            {
                playerInput[playerPresses] = 0;
                playerPresses++;
                console.log("Presses: " + (numInputs - playerPresses));
            }
        }
        else if (color === 1)
        {
            document.getElementById('triangle-right').style.opacity = 0.5;
            greenSound.play();
            if (playerTurn) 
            {
                playerInput[playerPresses] = 1;
                playerPresses++;
                console.log("Presses: " + (numInputs - playerPresses));
            }
        } 
        else if (color === 2) {
            document.getElementById('triangle-left').style.opacity = 0.5;
            yellowSound.play();
            if (playerTurn)
            {
                playerInput[playerPresses] = 2;
                playerPresses++;
                console.log("Presses: " + (numInputs - playerPresses));
            }
        }
        else 
        {
            document.getElementById('triangle-down').style.opacity = 0.5;
            redSound.play();
            if (playerTurn)
            {
                playerInput[playerPresses] = 3;
                playerPresses++;
                console.log("Presses: " + (numInputs - playerPresses));
            } 
        }
        setTimeout(originalColor, 500, color);
        check();
    }
    
}

function check(){
    if (playerTurn == true)
    {
        console.log(playerInput);
        console.log(compInput);
        if (playerInput[playerPresses - 1] != compInput[playerPresses - 1])
        {
            lives--;
            console.log("Lives: " + lives);
            if (lives == 0)
            {
                reset();
                alert("You have lost");
            }
        }
        if (playerPresses == numInputs)
        {
            score++;
            console.log("Score: " + score);
            level++;
            console.log("Level: " + level);
            playerTurn = false;
            playerPresses = 0;
            setTimeout(game, 1500);
        } 
    }
}

function originalColor(color){
    if (color == 0) document.getElementById('triangle-up').style.opacity = 1;
    else if (color == 1) document.getElementById('triangle-right').style.opacity = 1;
    else if (color == 2) document.getElementById('triangle-left').style.opacity = 1;
    else document.getElementById('triangle-down').style.opacity = 1;
}

function reset(){
    gameStart =  false;
    playerTurn = false;
    level = 1;
    lives = 1;
    score = 0;
    numInputs = 4;
    gameSpeed = 750;
}