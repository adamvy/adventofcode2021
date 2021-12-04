import { getInput } from "./util/aoc.js";
import {
  sum,
  seq,
  some,
  every,
  map,
  filter,
  reduce,
  join,
  find,
} from "./util/funcs.js";

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

let lines = input.split("\n").slice();
let draws = lines[0].split(",").map((n) => parseInt(n));

let b = [];
let boards = [];
for (let line of lines.slice(2)) {
  line = line.trim();

  if (line == "") {
    boards.push(board(5, b));
    b = [];
    continue;
  }

  b.push(line.split(/[ ]+/).map((n) => parseInt(n)));
}

function board(n, data) {
  let dim = () => seq(0, n);

  return {
    data: data,
    *rows() {
      for (let row of dim())
        yield (function* () {
          for (let col of dim()) yield data[row][col];
        })();
    },

    *cols() {
      for (let col of dim())
        yield (function* () {
          for (let row of dim()) yield data[row][col];
        })();
    },

    *straights() {
      yield* this.rows();
      yield* this.cols();
    },

    *cells() {
      for (let row of dim())
        for (let col of dim())
          yield {
            row,
            col,
            set(v) {
              data[this.row][this.col] = v;
            },
            get() {
              return data[this.row][this.col];
            },
          };
    },

    *values() {
      for (let row of dim()) for (let col of dim()) yield data[row][col];
    },
  };
}

function print(b) {
  for (let row of b.rows()) console.log(join(row, " "));
}

let n;
let winner;
for (n of draws) {
  for (let board of boards) {
    for (let cell of board.cells()) {
      if (cell.get() == n) cell.set(-1);
    }
  }

  winner = find(boards, (board) =>
    some(board.straights(), (s) => every(s, (n) => n == -1))
  );

  if (winner) break;
}

console.log(
  reduce(
    filter(winner.values(), (n) => n > 0),
    sum,
    0
  ) * n
);

let winners = new Set();

for (n of draws) {
  for (let board of boards) {
    for (let cell of board.cells()) {
      if (cell.get() == n) cell.set(-1);
    }
  }

  for (let board of boards) {
    if (some(board.straights(), (s) => every(s, (n) => n == -1))) {
      winners.add(board);
      winner = board;
    }
  }

  boards = boards.filter((b) => !winners.has(b));

  if (boards.length == 0) break;
}

console.log(
  reduce(
    filter(winner.values(), (n) => n > 0),
    sum,
    0
  ) * n
);
