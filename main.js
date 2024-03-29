let pc = new Player();

const Gameboard = (function(){
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener('click', function(){
            pc.playerClick(square);
        });
    });
    
    function resetBoard(){
        squares.forEach(square =>{
            square.innerHTML = '';
        });
        (pc.ownershipX).length = 0;
        (pc.ownershipO).length = 0;
        document.querySelector(".turn").innerHTML = "X";
        document.querySelector(".winner").innerHTML = "Winner: ...";
    }

    return {resetBoard};
})();

// Game Object (module)
// checkWinner() - checks if any player has 3 in a row
//      -> checks if every space is filled, make that a tie
//      -> checks if array of their spaces matches any of the win conditions
const Game = (function(){
    let currentSymbol = "X";
    let circleTurn = false;

    const WINCONDITIONS = 
    [
        ["0","1","2"],
        ["3","4","5"],
        ["6","7","8"],
        ["0","3","6"],
        ["2","5","8"],
        ["1","4","7"],
        ["0","4","8"],
        ["2","4","6"]
    ];

    // change bottom text to turn name;
    function swapTurns(){
        if(circleTurn){
            circleTurn = false;
            document.querySelector(".turn").innerHTML = "X";
            this.currentSymbol = "X";

        } else {
            circleTurn = true;
            document.querySelector(".turn").innerHTML = "O";
            this.currentSymbol = "O";
        }
        //console.log(circleTurn);
    }
    function checkDraw(){
        if((pc.ownershipO.length +  pc.ownershipX.length) == 9){
            document.querySelector(".winner").innerHTML = "DRAW";
        }
    }

    function checkWinner(){
        // go through each possible win combo 
        // and see if all of any given combo is in
        // ownershipX or ownershipY
        // if winner, change bottom text

        function _displayWinner(winner){
            document.querySelector(".turn").innerHTML = "";
            const winnerText = document.querySelector(".winner");
            winnerText.innerHTML = `Winner: ${winner}`;
        }

        // If X won
        if((pc.ownershipX).includes("1") && (pc.ownershipX).includes("2") && (pc.ownershipX).includes("0")){_displayWinner("X");}
        else if((pc.ownershipX).includes("3") && (pc.ownershipX).includes("4") && (pc.ownershipX).includes("5")){_displayWinner("X");}
        else if((pc.ownershipX).includes("0") && (pc.ownershipX).includes("4") && (pc.ownershipX).includes("8")){_displayWinner("X");}
        else if((pc.ownershipX).includes("2") && (pc.ownershipX).includes("4") && (pc.ownershipX).includes("6")){_displayWinner("X");}
        else if((pc.ownershipX).includes("6") && (pc.ownershipX).includes("7") && (pc.ownershipX).includes("8")){_displayWinner("X");}
        else if((pc.ownershipX).includes("0") && (pc.ownershipX).includes("3") && (pc.ownershipX).includes("6")){_displayWinner("X");}
        else if((pc.ownershipX).includes("2") && (pc.ownershipX).includes("5") && (pc.ownershipX).includes("8")){_displayWinner("X");}
        else if((pc.ownershipX).includes("1") && (pc.ownershipX).includes("7") && (pc.ownershipX).includes("4")){_displayWinner("X");}

        // If O won
        if((pc.ownershipO).includes("1") && (pc.ownershipO).includes("2") && (pc.ownershipO).includes("0")){_displayWinner("O");}
        else if((pc.ownershipO).includes("3") && (pc.ownershipO).includes("4") && (pc.ownershipO).includes("5")){_displayWinner("O");}
        else if((pc.ownershipO).includes("0") && (pc.ownershipO).includes("4") && (pc.ownershipO).includes("8")){_displayWinner("O");}
        else if((pc.ownershipO).includes("2") && (pc.ownershipO).includes("4") && (pc.ownershipO).includes("6")){_displayWinner("O");}
        else if((pc.ownershipO).includes("6") && (pc.ownershipO).includes("7") && (pc.ownershipO).includes("8")){_displayWinner("O");}
        else if((pc.ownershipO).includes("2") && (pc.ownershipO).includes("5") && (pc.ownershipO).includes("8")){_displayWinner("O");}
        else if((pc.ownershipO).includes("1") && (pc.ownershipO).includes("7") && (pc.ownershipO).includes("4")){_displayWinner("O");}
        else if((pc.ownershipO).includes("0") && (pc.ownershipO).includes("3") && (pc.ownershipO).includes("6")){_displayWinner("O");}
    }

    return{swapTurns,currentSymbol,checkWinner,checkDraw};
})();

// Player Object  (factory function)
// clickBox() - fill box with that player's symbol
//      -> check that space isn't already filled (index = '')
//      -> keeps track of each symbol in a separate array

function Player(){
    let ownershipX = [];
    let ownershipO = [];

    function _verifyClick(square){
        if(square.innerHTML == ""){
            return true;
        } else {
            return false;
        }
    }

    function playerClick(square){
        if(_verifyClick(square)){    
            if(Game.currentSymbol == "X"){
                ownershipX.push(square.id);
                //console.log("X:", ownershipX);
            }else{
                ownershipO.push(square.id);
                //console.log("O:", ownershipO);
            }
            square.innerHTML = Game.currentSymbol;
            Game.swapTurns();
            Game.checkDraw();
            Game.checkWinner();
        }
    }
    return {playerClick,ownershipX, ownershipO};
};
