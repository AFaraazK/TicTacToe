let pc = new Player("X");

// Gameboard object (module)
// add eventListeners to each square to listen for click
// renderBoard() - loops through array, fills in the pieces
const Gameboard = (function(){
    board = [];
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener('click', function(){
            pc.playerClick(square);
        });
    });    

    return {};
})();

// Game Object (module)
// checkWinner() - checks if any player has 3 in a row
//      -> checks if every space is filled, make that a tie
//      -> checks if array of their spaces matches any of the win conditions
const Game = (function(){
    let currentSymbol = "X";
    let circleTurn = false;
    function swapTurns(){
        if(circleTurn){
            circleTurn = false;
            this.currentSymbol = "X";

        } else {
            circleTurn = true;
            this.currentSymbol = "O";
        }
        console.log(circleTurn);
    }

    return{swapTurns,currentSymbol};
})();

// Player Object  (factory function)
// clickBox() - fill box with that player's symbol
//      -> check that space isn't already filled (index = '')
//      -> keeps track of each symbol in a separate array

function Player(symbol){
    let ownership = [];
    this.symbol = symbol;

    function verifyClick(square){
        if(square.innerHTML == ""){
            return true;
        } else {
            return false;
        }
    }
    function playerClick(square){
        if(verifyClick(square)){    
            ownership.push(square.id);
            square.innerHTML = Game.currentSymbol;
            console.log(ownership);
            Game.swapTurns();
        }
    }
    return {playerClick,symbol,ownership};
};
