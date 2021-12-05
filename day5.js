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

input = testinput;

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

function* trace(a, b) {
    let dx = a[0] < b[0] ? 1 : a[0] > b[0] ? -1 : 0;
    let dy = a[1] < b[1] ? 1 : a[1] > b[1] ? -1 : 0;
    
    let x = a[0];
    let y = a[1];
    while ( x != b[0] + dx || y != b[1] + dy ) {
        yield [x, y];
        x += dx;
        y += dy;
    }
}

function flat(x, y) { return y * maxy + x; }

let cells = [];

for ( let line of segments.filter(s => s[0][0] == s[1][0] || s[0][1] == s[1][1]) ) {
    for ( let p of trace(...line)) {
        let [x, y] = p;
        cells[flat(x, y)] = (cells[flat(x, y)] || 0) + 1;
    }
}

console.log(count(filter(cells, c => c > 1)));

cells = [];

for ( let line of segments ) {
    for ( let p of trace(...line)) {
        let [x, y] = p;
        cells[flat(x, y)] = (cells[flat(x, y)] || 0) + 1;
    }
}

console.log(count(filter(cells, c => c > 1)));