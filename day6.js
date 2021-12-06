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
  forEach,
  sort,
} from "./util/funcs.js";

let input = await getInput(6);

let testinput = `3,4,3,1,2`;

//input = testinput;

let fish = input.split(',');

let start = new Map();

function inc(k, m, v) { m.set(k, (m.get(k) || 0) + (v || 1)); }

fish.forEach(f => inc(f, start));

let counts = new Map(start);

for ( let i = 0 ; i < 80 ; i++ ) {
    let c2 = new Map();
    for ( let entry of counts.entries() ) {
        let n = entry[0] - 1;
        if ( n == -1 ) {
            n = 6;
            inc(8, c2, entry[1]);
        }
        inc(n, c2, entry[1]);
    }
    counts = c2;

}

console.log(reduce(counts.values(), sum, 0));

counts = new Map(start);

for ( let i = 0 ; i < 256 ; i++ ) {
    let c2 = new Map();
    for ( let entry of counts.entries() ) {
        let n = entry[0] - 1;
        if ( n == -1 ) {
            n = 6;
            inc(8, c2, entry[1]);
        }
        inc(n, c2, entry[1]);
    }
    counts = c2;

}

console.log(reduce(counts.values(), sum, 0));