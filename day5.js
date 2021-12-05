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
  count,
} from "./util/funcs.js";

let input = await getInput(5);

let testinput = `0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`;

//input = testinput;

let lines = input.split('\n').slice(0, -1);

let segments = [];
let points = [];


for (let line of lines ) {
    let parts = line.split(' -> ');
    let start = parts[0].split(',').map(n => parseInt(n));
    let end = parts[1].split(',').map(n => parseInt(n));
    segments.push([start, end]);
    points.push(start);
    points.push(end);
}

let max = (a, b) => a > b ? a : b;

let maxx = reduce(map(points, p => p[0]), max);
let maxy = reduce(map(points, p => p[1]), max);

function between(n, a, b) {
    let start = Math.min(a, b);
    let end = Math.max(a, b);
    return n >= start && n <= end;
}

let cells = [];

for ( let x of seq(0, maxx + 1) ) {
    for ( let y of seq(0, maxy + 1) ) {
        for ( let line of segments.filter(s => s[0][0] == s[1][0] || s[0][1] == s[1][1]) ) {
            if ( x == line[0][0] && between(y, line[0][1], line[1][1]) ||
                y == line[0][1] && between(x, line[0][0], line[1][0]) ) cells[y * maxy + x] = (cells[y * maxy + x] || 0) + 1;
        }
    }
}

console.log(count(filter(cells, c => c > 1)));

cells = [];

for ( let line of segments) {
    let dx = line[1][0] - line[0][0];
    let dy = line[1][1] - line[0][1];

    dx = dx < 0 ? -1 : dx > 0 ? 1 : 0;
    dy = dy < 0 ? -1 : dy > 0 ? 1 : 0;

    let x = line[0][0];
    let y = line[0][1];
    
    while(x != line[1][0] || y != line[1][1]) {
        cells[y * maxy + x] = (cells[y * maxy + x] || 0) + 1;
        x += dx;
        y += dy;
    }
    cells[y * maxy + x] = (cells[y * maxy + x] || 0) + 1;
}

console.log(count(filter(cells, c => c > 1)));