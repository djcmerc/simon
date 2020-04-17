var startButton = document.getElementById('start-button');
var resetButton = document.getElementById('reset-button');
blue = new Button(document.getElementById('triangle-up'), document.getElementById('up-sound'));
green = new Button(document.getElementById('triangle-right'), document.getElementById('right-sound'));
yellow = new Button(document.getElementById('triangle-left'), document.getElementById('left-sound'));
red = new Button(document.getElementById('triangle-down'), document.getElementById('down-sound'));
var gameStart = false;
var level = 1;
var lives = 3;
var score = 0;
var playerTurn = false;
var playerInput = [];
var compInput = [];
var numInputs = 4;
var playerPresses = 0;
var gameSpeed = 925;
var onStreak = false;
var streakNum = 0;
var scoreMultiplier = 1.0;

// Starts the game on button click if the game has not started
startButton.addEventListener("click", function(){
    if (gameStart == false) 
    {
        gameStart = true;
        game();
    }
});

// Resets game to original state on button click
resetButton.addEventListener("click", function(){
    resetGameConditions();
    resetInformation();
});

// Listeners to handle arrows clicks on player turn
blue.image.addEventListener("click", function(){
    if (playerTurn)colorHandler(0)});
green.image.addEventListener("click", function(){
    if (playerTurn) colorHandler(1)});
yellow.image.addEventListener("click", function(){
    if (playerTurn) colorHandler(2)});
red.image.addEventListener("click", function(){
    if (playerTurn) colorHandler(3)});

// Game logic
function game(){
    if (gameStart == true)
    {
        playerPresses = 0;
        if (playerTurn == false)
        {
            compInput = new Array(numInputs);
            playerInput = new Array(numInputs);
            document.getElementById('presses').innerHTML = "Presses: " + numInputs;
            document.getElementById('turn').innerHTML = "<h3>Turn: Computer</h3>" ;
            for (var i = 0; i < compInput.length; i++)
            {
                compInput[i] = Math.floor(Math.random() * 4);
            }
        
            for (var j = 0; j < compInput.length; j++)
            {
                console.log(compInput[j]);
                setTimeout(colorHandler, gameSpeed * j, compInput[j]);
            }
            setTimeout(function(){
                playerTurn = true;
                document.getElementById('turn').innerHTML = "<h3>Turn: Player</h3>";
                game();
            }, gameSpeed * numInputs + 250);
        }
    }
}

// Checks which color is being pressed
function colorHandler(color){
    if (gameStart == true)
    {    
        if (color === 0) 
        {
            document.getElementById('triangle-up').style.opacity = 0.5;
            //blueSound.play();
            blue.playSound();
            if (playerTurn)
            {
                playerInput[playerPresses] = 0;
                playerPresses++;
                document.getElementById('presses').innerHTML = "Presses: " + (numInputs - playerPresses);
            }
        }
        else if (color === 1)
        {
            document.getElementById('triangle-right').style.opacity = 0.5;
            green.playSound();
            if (playerTurn) 
            {
                playerInput[playerPresses] = 1;
                playerPresses++;
                document.getElementById('presses').innerHTML = "Presses: " + (numInputs - playerPresses);
            }
        } 
        else if (color === 2) {
            document.getElementById('triangle-left').style.opacity = 0.5;
            yellow.playSound();
            if (playerTurn)
            {
                playerInput[playerPresses] = 2;
                playerPresses++;
                document.getElementById('presses').innerHTML = "Presses: " + (numInputs - playerPresses);
            }
        }
        else 
        {
            document.getElementById('triangle-down').style.opacity = 0.5;
            red.playSound();
            if (playerTurn)
            {
                playerInput[playerPresses] = 3;
                playerPresses++;
                document.getElementById('presses').innerHTML = "Presses: " + (numInputs - playerPresses);
            } 
        }
        setTimeout(originalColor, 500, color);
        check();
    }
    
}

// Checks if input matches and modifies state of game
function check(){
    if (playerTurn == true)
    {
        if (playerInput[playerPresses - 1] != compInput[playerPresses - 1])
        {
            lives--;
            document.getElementById('lives').innerHTML = "Lives: " + lives;
            streakNum = 0;
            scoreStreak();
            document.getElementById('streak').innerHTML = "<h3>Streak: " + streakNum + "</h3>";
            playerTurn = false;
            setTimeout(game, 1500);
            if (lives == 0)
            {
                resetGameConditions();
                resetInformation();
                alert("You have lost");
            }
        }
        if (playerPresses == numInputs)
        {
            score+= Math.floor(100 * scoreMultiplier);
            document.getElementById('score').innerHTML = "Score: " + score;
            level++;
            document.getElementById('level').innerHTML = "Level: " + level;
            streakNum++;
            playerTurn = false;
            playerPresses = 0;
            levelConditionsAdjust();
            scoreStreak();
            document.getElementById('streak').innerHTML = "<h3>Streak: " + streakNum + "</h3>";
            setTimeout(game, 1500);
        } 
    }
}

// Handles putting original state of color back
function originalColor(color){
    if (color == 0) document.getElementById('triangle-up').style.opacity = 1;
    else if (color == 1) document.getElementById('triangle-right').style.opacity = 1;
    else if (color == 2) document.getElementById('triangle-left').style.opacity = 1;
    else document.getElementById('triangle-down').style.opacity = 1;
}

// Adjusts game speed based on level
function levelConditionsAdjust(){
    if (level >= 10 && level < 20)
    {
        gameSpeed = Math.floor(gameSpeed * 0.945);
        numInputs = 5;
    }
    else if (level >= 20 && level < 30)
    {
        gameSpeed = Math.floor(gameSpeed * 0.945);
        numInputs = 6;
    } 
    else if (level >= 30 && level < 40)
    {
        gameSpeed = Math.floor(gameSpeed * 0.945);
        numInputs = 7;
    } 
    else if (level >= 40 && level < 50)
    {
        gameSpeed = Math.floor(gameSpeed * 0.945);
        numInputs = 8;
    } 
    else if (level == 50)
    {
        alert("You have won! Congratulations!");
        resetGameConditions();
        resetInformation();
    }
}

// Adjusts score if streak
function scoreStreak(){
    if (streakNum >= 3) onStreak = true;
    else onStreak = false;

    if (onStreak)
    {
        if (streakNum >= 3 && streakNum < 8) scoreMultiplier = 1.2;
        else if (streakNum >= 8 && streakNum < 13) scoreMultiplier = 1.35;
        else scoreMultiplier = 1.5;
    }
    else scoreMultiplier = 1.0;
}

// Resets game conditions to original state
function resetGameConditions(){
    gameStart = false;
    playerTurn = false;
    level = 1;
    lives = 3;
    score = 0;
    numInputs = 4;
    gameSpeed = 925;
    onStreak = false;
    streakNum = 0;
    scoreMultiplier = 1.0;
}

// Resets information to original state
function resetInformation(){
    document.getElementById('score').innerHTML = "Score: " + score;
    document.getElementById('turn').innerHTML = "<h3>Turn: </h3>";
    document.getElementById('lives').innerHTML = "Lives: " + lives;
    document.getElementById('level').innerHTML = "Level: " + level;
    document.getElementById('presses').innerHTML = "Presses: " + numInputs;
    document.getElementById('streak').innerHTML = "<h3>Streak: " + streakNum + "</h3>";
}