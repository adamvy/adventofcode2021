import { getInput } from "./util/aoc.js";

let input = await getInput(4);

let testinput = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

//input = testinput;

let lines = input.split('\n').slice();


let draws = lines[0].split(',').map(n => parseInt(n));

let boards = [];

let board = [];
for ( let line of lines.slice(2) ) {
    line = line.trim();

    if ( line == '') {
        boards.push(board);
        board = [];
        continue;
    }

    board.push(line.split(/[ ]+/g).map(n => parseInt(n)));
}

let winner;
let n;
for ( n of draws ) {
    boards.forEach((board, i) => {
        board.forEach((row, j) => {
            row.forEach((cell, k) => {
                if ( cell == n ) boards[i][j][k] = -1; //marks[i][j][k] = 1;
            })
        })
    });

    boards.forEach((board, i) => {
        let won = true;

        for ( let j = 0 ; j < 5 ; j++ ) {
            won = true;
            for ( let k = 0 ; k < 5 ; k++ ) {
              won = won && board[j][k] < 0;
            }
            if ( won ) {
                winner = board;
                return;
            }
        }

        if ( won ) {
            winner = board;
            return;
        }

        for ( let k = 0 ; k < 5 ; k++ ) {
            won = true;
            for ( let j = 0 ; j < 5 ; j++ ) {
                won = won && board[j][k] < 0;
            }
            
        if ( won ) {
            winner = board;
            return;
        }
        }

        if ( won ) {
            winner = board;
            return;
        }

        return;// no diagonals

        won = true;

        for ( let j = 0, k = 0 ; j < 5 ; j++, k++ ) {
            won = won && board[j][k] < 0;
        }
        
        if ( won ) {
            winner = board;
            return;
        }
        
        won = true;

        for ( let j = 4, k = 0; j >= 0; j--, k++ ) {
            won = won && board[j][k] < 0;
        }
    
        if ( won ) {
            winner = board;
            return;
        }
    })

    if ( winner != undefined ) break;
}

let sum = (a, b) => a + b;

console.log(winner.map(row => row.filter(n => n >= 0).reduce(sum, 0)).reduce(sum, 0));
console.log(winner.map(row => row.filter(n => n >= 0).reduce(sum, 0)).reduce(sum, 0) * n);


boards = [];
board = [];

for ( let line of lines.slice(2) ) {
    line = line.trim();

    if ( line == '') {
        boards.push(board);
        board = [];
        continue;
    }

    board.push(line.split(/[ ]+/g).map(n => parseInt(n)));
}

winner = undefined;

for ( n of draws ) {
    boards.forEach((board, i) => {
        board.forEach((row, j) => {
            row.forEach((cell, k) => {
                if ( cell == n ) boards[i][j][k] = -1; //marks[i][j][k] = 1;
            })
        })
    });

    let winners = [];

    boards.forEach((board, i) => {
        let won = true;

        for ( let j = 0 ; j < 5 ; j++ ) {
            won = true;
            for ( let k = 0 ; k < 5 ; k++ ) {
              won = won && board[j][k] < 0;
            }
            if ( won ) {
                winners.push(board);
            }
        }

        if ( won ) {
            winners.push(board);
        }

        for ( let k = 0 ; k < 5 ; k++ ) {
            won = true;
            for ( let j = 0 ; j < 5 ; j++ ) {
                won = won && board[j][k] < 0;
            }
            
        if ( won ) {
            winners.push(board);
        }
    }

        return;// no diagonals

        won = true;

        for ( let j = 0, k = 0 ; j < 5 ; j++, k++ ) {
            won = won && board[j][k] < 0;
        }
        
        if ( won ) {
            winner = board;
            return;
        }
        
        won = true;

        for ( let j = 4, k = 0; j >= 0; j--, k++ ) {
            won = won && board[j][k] < 0;
        }
    
        if ( won ) {
            winner = board;
            return;
        }
    })

    if ( winners.length > 0 ) {
        winners.forEach(w => boards = boards.filter(b => b != w));

    if ( boards.length == 0 ) {
        winner = winners[0];
        break;
    }
}
}


console.log(winner.map(row => row.filter(n => n >= 0).reduce(sum, 0)).reduce(sum, 0));
console.log(winner.map(row => row.filter(n => n >= 0).reduce(sum, 0)).reduce(sum, 0) * n);
