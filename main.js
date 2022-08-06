// Gameboard object (module)
// add eventListeners to each square to listen for click
// renderBoard() - loops through array, fills in the pieces
const Gameboard = (function(){
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener('click', function(){
            square.innerHTML = "X"
        });
    });    

    return {};
})();


// Game Object (module)
// checkWinner() - checks if any player has 3 in a row
//      -> checks if every space is filled, make that a tie
//      -> checks if array of their spaces matches any of the win conditions
const Game = (function(){

})();

// Player Object  (factory function)
// clickBox() - fill box with that player's symbol
//      -> check that space isn't already filled (index = '')
//      -> keeps track of each symbol in a separate array

const Player = function(){

};