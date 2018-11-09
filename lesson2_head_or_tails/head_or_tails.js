const minimist = require('minimist');
const rn = require('random-number');
const readline = require('readline');
const fs = require('fs');

// parse command line arguments
const argv = minimist(process.argv.slice(2), {
    alias: {
        log: 'l'
    }
});

if(!argv.log){
    console.log('Error: required parameter is missing: -l (--log) - log file name for stats');
    process.exit();
}

// generate computer random answer
const computerAnswer = rn({
    min: 1,
    max: 2,
    integer: true
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// main logic
rl.question('Guess a number - 1 or 2?\n:>', (answer) => {
    playGame(answer, argv.log);
    rl.close();
    process.stdin.destroy();
});

// helper function and class below
let playGame = (answer, logFile) => {
    // check answer
    let numAnswer = Number(answer);
    if(isNaN(numAnswer) || numAnswer < 1 || numAnswer > 2) {
        console.log(`Error: possible values 1 and 2, you entered: ${answer}`);
        return;
    }

    let win = (numAnswer === computerAnswer);
    let message = win ? 'You win!' : 'You lose';
    console.log(message);
    
    let game = {
        gameDate: (new Date()).toLocaleDateString('ru-RU', {hour: 'numeric', minute: 'numeric', second: 'numeric'}),
        userWin: win
    }

    // get stats from file or create them
    let gameStats = new GameStats();
    if(fs.existsSync(logFile)){
        let logFileContents = fs.readFileSync(logFile);
        gameStats = new GameStats(JSON.parse(logFileContents.toString()));
    }
    gameStats.addGame(game);

    // show stats
    let stats = 
`Games played: ${gameStats.countRounds()}
User won: ${gameStats.countUserWins()}
Computer won: ${gameStats.countComputerWins()}
Max user wins in a row: ${gameStats.countMaxUserWinsInARow()}
Max computer wins in a row: ${gameStats.countMaxComputerWinsInARow()}
User wins percentage: ${gameStats.countUserWinsPercent()} %`;

    // write new stats to file
    console.log(stats);
    fs.writeFileSync(logFile, JSON.stringify(gameStats.getGames(), null, 2), 'utf-8');
}

class GameStats {
    constructor(games) {
        this.games = games ? games : [];
    }

    getGames() {
        return this.games;
    }

    addGame(game) {
        this.games.push(game);
    }

    countRounds() {
        return this.games.length;
    }

    countUserWins() {
        let userWins = 0;
        for(let i in this.games)
            if(this.games[i].userWin)
                userWins++;
        return userWins;
    }

    countComputerWins() {
        return this.countRounds() - this.countUserWins();
    }

    countUserWinsPercent() {
        return Math.round(this.countUserWins() / this.countRounds() * 100);
    }

    countMaxWinsInARow(userWins = true) {
        let maxWinsInRow = 1;
        let currentWinsInRow = 1;
        for(let i = 1; i < this.games.length; i++) {
            if(this.games[i].userWin === userWins && this.games[i-1].userWin === userWins)
                currentWinsInRow++;
            else{
                if(currentWinsInRow > maxWinsInRow)
                    maxWinsInRow = currentWinsInRow;
                currentWinsInRow = 1;
            }
        }
        return Math.max(maxWinsInRow, currentWinsInRow);
    }

    countMaxUserWinsInARow() {
        return this.countMaxWinsInARow();
    }

    countMaxComputerWinsInARow() {
        return this.countMaxWinsInARow(false);
    }
}