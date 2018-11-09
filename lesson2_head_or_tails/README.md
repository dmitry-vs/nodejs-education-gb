# Head or Tails 

Head or Tails is a command-line interface game created as a home task for Geekbrains Node.js course, lesson 2.

## Rules

Computer generates random integer number from 1 to 2 inclusive (either 1 or 2). 

User makes his guess what that number is. If he is right, user wins. Otherwise, computer wins.

Result gets saved to a log file, which then can be used to count game stats and overall success percentage.

## Usage

    node head_or_tails.js --log gamestats.log

## Parameters

`-l, --log` - name of log file to save results of the game 

## Example

    >node lesson2_head_or_tails.js --log logfile.log
    Guess a number - 1 or 2?
    :>1
    You win!
    Games played: 2
    User won: 1
    Computer won: 1
    Max user wins in a row: 1
    Max computer wins in a row: 1
    User wins percentage: 50 %
