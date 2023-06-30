//Begin the game when page loads
onload = startGame();

//Global variables: round counter, human victories, computer victories
let humanVictories = 0;
let computerVictories = 0;

//This function adds event listeners to all buttons (R,P,S)
function startGame() {
    const btns = document.querySelectorAll('button');

    btns.forEach((btn) => {
        btn.addEventListener('click', () => playRound(btn.id));
    })
}

//This function will get the computer's choice
function getComputerChoice() {
    //Generate a random number between 0 and 2
    let ranNum = Math.floor(Math.random() * 3);

    //Assign the random number to a string
    let computerSelection;
    switch(ranNum) {
        case 0:
            computerSelection = "Rock";
            break;
        case 1:
            computerSelection = "Paper";
            break;
        case 2:
            computerSelection = "Scissors";
    }
    return computerSelection;
}

//This function will get the player's choice, decide the game outcome, and
//display the results
function playRound(humanWeapon) {
    //Call function to get computer's choice
    let computerWeapon = getComputerChoice();

    //Determine the game outcome
    let roundOutComeMessage = determineOutcome(humanWeapon, computerWeapon)

    //Print results
    printResults(roundOutComeMessage, humanWeapon, computerWeapon);

    //Endgame - triggered if 3 victories are reached
    if (humanVictories === 3 || computerVictories === 3) {
        endgame();
    }
}

function determineOutcome(humanWeapon, computerWeapon) {
    let roundMessage;
    let tieMessage = humanWeapon + ' against ' + computerWeapon + '. Tie!';
    let humanMessage = humanWeapon + ' beats ' + computerWeapon +
        ', you win this round!';
    let computerMessage = computerWeapon + ' beats ' + humanWeapon +
    ', you lose this round!';

    if (humanWeapon === computerWeapon) {
        roundMessage = tieMessage;
    }
    else if (humanWeapon == 'Rock' && computerWeapon =='Paper') {
        roundMessage = computerMessage;
        computerVictories++;
    }
    else if (humanWeapon == 'Rock' && computerWeapon =='Scissors') {
        roundMessage = humanMessage;
        humanVictories++;
    }
    else if (humanWeapon == 'Paper' && computerWeapon == 'Rock') {
        roundMessage = humanMessage;
        humanVictories++;
    }
    else if (humanWeapon == 'Paper' && computerWeapon == 'Scissors') {
        roundMessage = computerMessage;
        computerVictories++;
    }
    else if (humanWeapon == 'Scissors' && computerWeapon == 'Rock') {
        roundMessage = computerMessage;
        computerVictories++;
    }
    else if (humanWeapon == 'Scissors' && computerWeapon == 'Paper') {
        roundMessage = humanMessage;
        humanVictories++;
    }

    return roundMessage;
}

//This function prints the round results
function printResults(roundOutComeMessage, humanWeapon, computerWeapon) {
    const scoreCountPrint = document.querySelector('#score');
    const outcomePrint = document.querySelector('#roundresults');
    
    //Running Score
    scoreCountPrint.textContent = 'Human: ' + humanVictories + '   Computer: ' +
        computerVictories;
    //Round Results
    outcomePrint.textContent = roundOutComeMessage;
}

//This function will display the game outcome and offer to play again
function endgame() {
    const outcomePrint = document.querySelector('#roundresults');

    if (humanVictories >= 3) {
        outcomePrint.textContent = 'You have defeated your foe. Congratulations!';
    }
    else {
        outcomePrint.textContent = 'You have been humiliated by your oppenent.'
    }

    //Removes the buttons and prompter
    document.querySelectorAll('button').forEach(e => e.remove());
    document.querySelector('#weapontext').remove();

    //Select weaponzone div
    const weaponzone = document.querySelector('#weaponzone');

    //Creates a new button to play again
    const newBtn = document.createElement('button');

    newBtn.classList.add('buttons');
    newBtn.textContent = 'Duel Again';

    //Append new button to page
    weaponzone.appendChild(newBtn);

    //Add event lisener to button to refresh page
    newBtn.addEventListener('click', () => location.reload());
}