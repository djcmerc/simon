import { Game } from "./game.js";

var startButton = document.getElementById('start-button');
var resetButton = document.getElementById('reset-button');
var blue = new Button(document.getElementById('triangle-up'), document.getElementById('up-sound'));
var green = new Button(document.getElementById('triangle-right'), document.getElementById('right-sound'));
var yellow = new Button(document.getElementById('triangle-left'), document.getElementById('left-sound'));
var red = new Button(document.getElementById('triangle-down'), document.getElementById('down-sound'));

console.log(blue);
// Starts the game on button click if the game has not started
startButton.addEventListener("click", function(){
    if (Game.gameStart == false) 
    {
        Game.gameStart = true;
        Game.game(blue, green, yellow, red);
    }
});

// Resets game to original state on button click
resetButton.addEventListener("click", function(){
    Game.resetGameConditions();
    Game.resetInformation();
});

// Listeners to handle arrows clicks on player turn
blue.image.addEventListener("click", function(){
    if (Game.playerTurn)Game.colorHandler(0, blue, green, yellow, red)});
green.image.addEventListener("click", function(){
    if (Game.playerTurn)Game.colorHandler(1, blue, green, yellow, red)});
yellow.image.addEventListener("click", function(){
    if (Game.playerTurn)Game.colorHandler(2, blue, green, yellow, red)});
red.image.addEventListener("click", function(){
    if (Game.playerTurn)Game.colorHandler(3, blue, green, yellow, red)});
