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
  forEach,
  sort,
} from "./util/funcs.js";

let input = await getInput(14);

let testinput = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C
`


//input = testinput;

let lines = input.split('\n');

let template = lines[0];
lines = lines.slice(2);

let rules = {};

for ( let line of lines ) {
    let parts = line.split(' -> ');
    let match = parts[0];
    let output = parts[1];
    rules[match] = output;
}

let a = template;
let anext = '';

console.log(rules);

for ( let i = 0 ; i < 10 ; i++ ) {
    for ( let j = 0 ; j < a.length - 1 ; j++) {
        let key = a.substr(j, 2);
        anext += key[0];
        if ( rules[key] ) anext += rules[key];
    }
    anext += a[a.length - 1];

    a = anext;
    anext = '';
}

let counts = {};
for ( let c of a ) { counts[c] = (counts[c] || 0) + 1 }

let min = reduce(Object.entries(counts), (a, b) => a[1] < b[1] ? a : b);
let max = reduce(Object.entries(counts), (a, b) => a[1] > b[1] ? a : b);

console.log(max[1] - min[1]);

function add(a, b) {
    for ( let c in b ) {
        a[c] = (a[c] || 0) + b[c];
    }
    return a;
}

function count(a, c) {
    a[c] = (a[c] || 0) + 1;
}

let limit = 40;

let go = (pair, depth) => {
  if (depth == limit) return;

  let counts = {};

  let c = rules[pair];
  if (c) {
      count(counts, c);
  }

  add(counts, go(pair[0] + c, depth + 1));
  add(counts, go(c + pair[1], depth + 1));

  return counts;
};

go = (function(f) {
    let cache = {};
    return function(pair, depth) {
        if ( cache[pair + depth] != undefined ) return cache[pair + depth];
        return cache[pair + depth] = f(pair, depth);
    };
})(go);


a = template;

counts = {};
for ( let c of a ) { counts[c] = (counts[c] || 0) + 1 }

for ( let i = 0 ; i < a.length - 1; i++ ) {
    add(counts, go(a.substr(i, 2), 0));
}

min = reduce(Object.entries(counts), (a, b) => a[1] < b[1] ? a : b);
max = reduce(Object.entries(counts), (a, b) => a[1] > b[1] ? a : b);

console.log(counts);

console.log(max[1] - min[1]);
