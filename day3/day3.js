import { getInput } from "../util/aoc.js";

let input = await getInput(3);

let testinput = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

//input = testinput;

let counts = [];

let lines = input.split("\n");

lines.map((line) => {
  Array.from(line).forEach((c, i) => {
    if (c == "1") {
      if (counts[i] == undefined) counts[i] = 1;
      else counts[i]++;
    }
  });
});

let gamma = parseInt(
  counts.map((c) => (c > lines.length / 2 ? "1" : "0")).join(""),
  2
);

let epsilon = gamma ^ ((1 << lines[0].length) - 1);

console.log(gamma * epsilon);

let oxygen = lines.slice();
let co2 = lines.slice();
let bit = 0;

while (oxygen.length > 1) {
  let count = oxygen
    .map((l) => l[bit])
    .reduce((s, c) => (c == "1" ? s + 1 : s), 0);
  let common = count >= oxygen.length / 2 ? "1" : "0";

  oxygen = oxygen.filter((l) => l[bit] == common);
  bit++;
}

bit = 0;

while (co2.length > 1) {
  let count = co2
    .map((l) => l[bit])
    .reduce((s, c) => (c == "1" ? s + 1 : s), 0);
  let uncommon = count >= co2.length / 2 ? "0" : "1";

  co2 = co2.filter((l) => l[bit] == uncommon);
  console.log(bit, uncommon, co2);
  bit++;
}

console.log(parseInt(oxygen.join(""), 2) * parseInt(co2.join(""), 2));
