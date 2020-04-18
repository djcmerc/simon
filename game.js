export const Game = {
    gameStart: false,
    level: 1,
    lives: 3,
    score: 0,
    playerTurn: false,
    playerInput: [],
    compInput: [],
    numInputs: 4,
    playerPresses: 0,
    gameSpeed: 925,
    onStreak: false,
    streakNum: 0,
    scoreMultiplier: 1.0,

    // Game logic
    game: function (blue, green, yellow, red) {
        if (Game.gameStart == true) {
            Game.playerPresses = 0;
            if (Game.playerTurn == false) {
                Game.compInput = new Array(Game.numInputs);
                Game.playerInput = new Array(Game.numInputs);
                document.getElementById('presses').innerHTML = "Presses: " + Game.numInputs;
                document.getElementById('turn').innerHTML = "<h3>Turn: Computer</h3>";
                for (var i = 0; i < Game.compInput.length; i++) {
                    Game.compInput[i] = Math.floor(Math.random() * 4);
                }

                for (var j = 0; j < Game.compInput.length; j++) {
                    console.log(Game.compInput[j]);
                    setTimeout(Game.colorHandler, Game.gameSpeed * j, Game.compInput[j], blue, green, yellow, red);
                }
                setTimeout(function () {
                    Game.playerTurn = true;
                    document.getElementById('turn').innerHTML = "<h3>Turn: Player</h3>";
                    Game.game();
                }, Game.gameSpeed * Game.numInputs + 250);
            }
        }
    },



    // Checks which color is being pressed
    colorHandler: function (color, blue, green, yellow, red) {
        if (Game.gameStart == true) {
            if (color === 0) {
                document.getElementById('triangle-up').style.opacity = 0.5;
                //blueSound.play();
                //blue.sound.play();
                if (Game.playerTurn) {
                    Game.playerInput[Game.playerPresses] = 0;
                    Game.playerPresses++;
                    document.getElementById('presses').innerHTML = "Presses: " + (Game.numInputs - Game.playerPresses);
                }
            } else if (color === 1) {
                document.getElementById('triangle-right').style.opacity = 0.5;
                //green.sound.play();
                if (Game.playerTurn) {
                    Game.playerInput[Game.playerPresses] = 1;
                    Game.playerPresses++;
                    document.getElementById('presses').innerHTML = "Presses: " + (Game.numInputs - Game.playerPresses);
                }
            } else if (color === 2) {
                document.getElementById('triangle-left').style.opacity = 0.5;
                //yellow.sound.play();
                if (Game.playerTurn) {
                    Game.playerInput[Game.playerPresses] = 2;
                    Game.playerPresses++;
                    document.getElementById('presses').innerHTML = "Presses: " + (Game.numInputs - Game.playerPresses);
                }
            } else {
                document.getElementById('triangle-down').style.opacity = 0.5;
                //red.sound.play();
                if (Game.playerTurn) {
                    Game.playerInput[Game.playerPresses] = 3;
                    Game.playerPresses++;
                    document.getElementById('presses').innerHTML = "Presses: " + (Game.numInputs - Game.playerPresses);
                }
            }
            setTimeout(Game.originalColor, 500, color);
            Game.check();
        }

    },

    // Checks if input matches and modifies state of game
    check: function () {
        if (Game.playerTurn == true) {
            if (Game.playerInput[Game.playerPresses - 1] != Game.compInput[Game.playerPresses - 1]) {
                Game.lives--;
                document.getElementById('lives').innerHTML = "Lives: " + Game.lives;
                Game.steakNum = 0;
                Game.scoreStreak();
                document.getElementById('streak').innerHTML = "<h3>Streak: " + Game.steakNum + "</h3>";
                Game.playerTurn = false;
                setTimeout(game, 1500);
                if (Game.lives == 0) {
                    Game.resetGameConditions();
                    Game.resetInformation();
                    alert("You have lost");
                }
            }
            if (Game.playerPresses == Game.numInputs) {
                Game.score += Math.floor(100 * Game.scoreMultiplier);
                document.getElementById('score').innerHTML = "Score: " + Game.score;
                Game.level++;
                document.getElementById('level').innerHTML = "Level: " + Game.level;
                Game.steakNum++;
                Game.playerTurn = false;
                Game.playerPresses = 0;
                Game.levelConditionsAdjust();
                Game.scoreStreak();
                document.getElementById('streak').innerHTML = "<h3>Streak: " + Game.steakNum + "</h3>";
                setTimeout(Game.game, 1500);
            }
        }
    },

    // Handles putting original state of color back
    originalColor: function (color) {
        if (color == 0) document.getElementById('triangle-up').style.opacity = 1;
        else if (color == 1) document.getElementById('triangle-right').style.opacity = 1;
        else if (color == 2) document.getElementById('triangle-left').style.opacity = 1;
        else document.getElementById('triangle-down').style.opacity = 1;
    },

    // Adjusts game speed based on level
    levelConditionsAdjust: function () {
        if (Game.level >= 10 && Game.level < 20) {
            Game.gameSpeed = Math.floor(Game.gameSpeed * 0.945);
            Game.numInputs = 5;
        } else if (Game.level >= 20 && Game.level < 30) {
            Game.gameSpeed = Math.floor(Game.gameSpeed * 0.945);
            Game.numInputs = 6;
        } else if (Game.level >= 30 && Game.level < 40) {
            Game.gameSpeed = Math.floor(Game.gameSpeed * 0.945);
            Game.numInputs = 7;
        } else if (Game.level >= 40 && Game.level < 50) {
            Game.gameSpeed = Math.floor(Game.gameSpeed * 0.945);
            Game.numInputs = 8;
        } else if (Game.level == 50) {
            alert("You have won! Congratulations!");
            Game.resetGameConditions();
            Game.resetInformation();
        }
    },

    // Adjusts score if streak
    scoreStreak: function () {
        if (Game.steakNum >= 3) Game.onStreak = true;
        else Game.onStreak = false;

        if (Game.onStreak) {
            if (Game.steakNum >= 3 && Game.steakNum < 8) Game.scoreMultiplier = 1.2;
            else if (Game.steakNum >= 8 && Game.steakNum < 13) Game.scoreMultiplier = 1.35;
            else Game.scoreMultiplier = 1.5;
        } else Game.scoreMultiplier = 1.0;
    },

    // Resets game conditions to original state
    resetGameConditions: function () {
        Game.gameStart = false;
        Game.playerTurn = false;
        Game.level = 1;
        Game.lives = 3;
        Game.score = 0;
        Game.numInputs = 4;
        Game.gameSpeed = 925;
        Game.onStreak = false;
        Game.steakNum = 0;
        Game.scoreMultiplier = 1.0;
    },

    // Resets information to original state
    resetInformation: function () {
        document.getElementById('score').innerHTML = "Score: " + Game.score;
        document.getElementById('turn').innerHTML = "<h3>Turn: </h3>";
        document.getElementById('lives').innerHTML = "Lives: " + Game.lives;
        document.getElementById('level').innerHTML = "Level: " + Game.level;
        document.getElementById('presses').innerHTML = "Presses: " + Game.numInputs;
        document.getElementById('streak').innerHTML = "<h3>Streak: " + Game.steakNum + "</h3>";
    }
}