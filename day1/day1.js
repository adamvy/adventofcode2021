import { getInput } from "../util/aoc.js";

let input = (await getInput(1)).split("\n").map((n) => parseInt(n));

let count = 0;
let last;
for (let depth of input) {
  if (last == undefined) last = depth;
  else {
    if (depth > last) count++;
    last = depth;
  }
}

console.log(count);

count = 0;
last = undefined;

for (let i = 0; i < input.length - 2; i++) {
  let s = input[i] + input[i + 1] + input[i + 2];
  if (last == undefined) last = s;
  else if (s > last) count++;
  last = s;
}

console.log(count);
