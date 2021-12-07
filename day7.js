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

let input = await getInput(7);

let testinput = `16,1,2,0,4,2,7,1,2,14`;

//input = testinput;

let crabs = input.split(",").map((i) => parseInt(i));

let max = (a, b) => (a > b ? a : b);
let min = (a, b) => (a < b ? a : b);

let f = crabs.reduce(max);

let cost = Infinity;
for (let i = 0; i <= f; i++) {
  cost = Math.min(cost, crabs.map((c) => Math.abs(i - c)).reduce(sum));
}

console.log(cost);

let fac = (a, b) => {
  let dist = Math.abs(a - b);
  let cost = 0;
  for (let i = 0; i < dist; i++) {
    cost += i + 1;
  }
  return cost;
};

cost = Infinity;
for (let i = 0; i <= f; i++) {
  cost = Math.min(cost, crabs.map((c) => fac(c, i)).reduce(sum));
}

console.log(cost);
