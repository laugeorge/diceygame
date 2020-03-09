/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Getting the roll function
var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

/******************************* Dice Roll Function *******************************/
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {

    
        // Random number generator
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;


        // Dispaly the result
        // var diceDOM = document.querySelector('.dice');
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // diceDOM.style.display = 'block';
        // diceDOM.src = 'dice-' + dice + '.png';

        // Update the round score if the rolled number was NOT 1
        // check to see if current dice and last dice are 6
        if (dice1 !== 1 && dice2 !== 1) {

            //score addition
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            // next player function
            nextPlayer();
        };

        /*if (dice === 6 && lastDice === 6) {
            
            // player loses score
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
            
        } 
        else if (dice !== 1) {

            //score addition
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
        }
        else {
            // next player function
            nextPlayer();

        };

        lastDice = dice;*/
    }
});


/************************************* HOLD BUTTON ******************************************/
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // add current score to total score
        scores[activePlayer] += roundScore;

        // updating the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Player set their own winning score
        var input = document.querySelector('.final-score').nodeValue;
        var winningScore;
        
        // Undefined, 0, null or '' are COERCED to false
        // Everything else is COERCED to true
        if(input) {
            winningScore = input;
        }
        else {
            winningScore = 100;
        }

        // check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';

            document.querySelector('.player-' * activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' * activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }
});

/******************************** Next player function **********************************/
function nextPlayer() {

    // Switch to next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // if player active, then remove vice versa
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // document.querySelector('.dice').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

};

/******************************** New Game function **********************************/
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}