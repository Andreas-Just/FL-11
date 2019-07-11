const prize = {
  standardPayoff: 100,
  currentPayoff: null,
  totalPayoff: 0
};
const gameOptions = {
  isGame: false,
  continueGame: true,
  numberAttempts: 3,
  currentAttempts: null,
  startingRange: 8,
  rangeStep: 4,
  randomInteger: null,
  playNumber: null
};
const magicNumbers = {
  oneHundred: 100
};

gameOptions.isGame = confirm(`Do you want to play a game?`);

while (gameOptions.isGame) {
  if (gameOptions.continueGame) {
    gameOptions.randomInteger = Math.floor(Math.random() * (gameOptions.startingRange + 1));

    attempts: for (let i = 1; i <= gameOptions.numberAttempts; i++) {
      gameOptions.currentAttempts = i;
      prize.currentPayoff = i === gameOptions.numberAttempts
        ? prize.standardPayoff / gameOptions.rangeStep
        : prize.standardPayoff / i;
      gameOptions.playNumber = prompt(
        `Choose a roulette pocket number from 0 to ${gameOptions.startingRange} \n
        Attempts left: ${gameOptions.currentAttempts} \n
        Total prize: ${prize.totalPayoff} \n
        Possible prize on current attempts: ${prize.currentPayoff}`
      );

      if (isNaN(+gameOptions.playNumber) || !isFinite(+gameOptions.playNumber) ||
          gameOptions.playNumber === null || gameOptions.playNumber === '') {
        alert(`“${gameOptions.playNumber}” - it is not number, please enter a number`);
        i--;
      } else if (+gameOptions.playNumber === gameOptions.randomInteger) {
        break attempts;
      }
    }

    if (+gameOptions.playNumber === gameOptions.randomInteger) {
      prize.totalPayoff += prize.currentPayoff;
      prize.standardPayoff += prize.standardPayoff;
      gameOptions.startingRange += gameOptions.rangeStep;
      gameOptions.continueGame = confirm(
        `Congratulation, you won! Your prize is: ${prize.totalPayoff} $. Do you want to continue?`
      );
    } else {
      prize.totalPayoff = 0;
      prize.standardPayoff = magicNumbers.oneHundred;
      gameOptions.startingRange = gameOptions.rangeStep + gameOptions.rangeStep;
      alert(`Thank you for your participation. Your prize is: ${prize.totalPayoff} $`);
      gameOptions.isGame = confirm(`Do you want to play a game?`);
    }

  } else {
    alert(`Thank you for your participation. Your prize is: ${prize.totalPayoff} $`);
    if (confirm(`Do you want to play a game?`)) {
      prize.totalPayoff = 0;
      prize.standardPayoff = magicNumbers.oneHundred;
      gameOptions.startingRange = gameOptions.rangeStep + gameOptions.rangeStep;
      gameOptions.continueGame = true;
    } else {
      break;
    }
  }
}
alert(`You did not become a billionaire, but can.`);
