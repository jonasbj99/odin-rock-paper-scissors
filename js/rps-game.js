let humanScore = 0;
let computerScore = 0;
let tieCounter = 0;

// When remade with UI use input field with only odd numbers, for "best of" (Potential 99 limit)
let rounds = prompt("How many rounds do you want to play?", "");

playGame(rounds);

function playGame() {
  let finalResult;

  for (let i = 0; i < rounds; i++) {
    playRound();
  }

  if (humanScore === computerScore) {
    finalResult = "The game was a tie! Here are the results:";
  } else if (humanScore > computerScore) {
    finalResult = "You won the game! Here are the results:";
  } else {
    finalResult = "You lost the game! Here are the results:";
  }

  console.group(finalResult);
  console.log("You won: " + humanScore + " rounds.");
  console.log("You tied: " + tieCounter + " rounds.");
  console.log("You lost: " + computerScore + " rounds.");
  console.groupEnd();
}

function playRound() {
  let humanChoice = getHumanChoice();
  let computerChoice = getComputerChoice();
  const winText = `You win! ${humanChoice} beats ${computerChoice} :)`;
  const lossText = `You lose! Your ${humanChoice} was beaten by ${computerChoice} :(`;
  let youWin;

  if (humanChoice != computerChoice) {
    switch (humanChoice) {
      case "Rock":
        youWin = computerChoice === "Scissors" ? true : false;
        break;
      case "Paper":
        youWin = computerChoice === "Rock" ? true : false;
        break;
      case "Scissors":
        youWin = computerChoice === "Paper" ? true : false;
        break;
      default:
        console.warn("Winner could'nt be decided! O.o");
        break;
    }

    if (youWin) {
      ++humanScore;
      console.log(winText);
    } else {
      ++computerScore;
      console.log(lossText);
    }
  } else {
    ++tieCounter;
    console.log(`You both chose ${humanChoice}, it's a tie :|`);
  }
}

function getComputerChoice() {
  const ranNum = Math.floor(Math.random() * 3);
  let choice;

  switch (ranNum) {
    case 0:
      choice = "Rock";
      break;
    case 1:
      choice = "Paper";
      break;
    case 2:
      choice = "Scissors";
      break;
    default:
      console.warn("Computer could'nt decide! O.o");
      break;
  }

  return choice;
}

function getHumanChoice() {
  let choice = prompt("Write your choice, rock, paper, or scissors?", "");
  choice = capitalizeString(choice);

  if (choice === "Rock" || choice === "Paper" || choice === "Scissors") {
    return choice;
  } else {
    alert("You have to choose one of the three!");
    return getHumanChoice();
  }
}

function capitalizeString(str) {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

function evaluateComputer(interval) {
  let rockCount = 0;
  let paperCount = 0;
  let scissorsCount = 0;

  for (let i = 0; i < interval; i++) {
    let result = getComputerChoice();

    switch (result) {
      case "Rock":
        rockCount++;
        break;
      case "Paper":
        paperCount++;
        break;
      case "Scissors":
        scissorsCount++;
        break;
      default:
        console.warn("Missing evaluation condition!");
        break;
    }
  }

  console.log(
    `From ${interval} intervals, ${rockCount} rock, ${paperCount} paper, and ${scissorsCount} scissors.`,
  );
}
