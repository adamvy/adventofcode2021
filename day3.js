import { getInput } from "./util/aoc.js";

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

let common = (lines, bit) =>
  lines.reduce((s, l) => (l[bit] == "1" ? s + 1 : s), 0) >= lines.length / 2
    ? "1"
    : "0";

let lines = input.split("\n");
let bits = lines[0].length;

let gamma = parseInt(
  Array(bits)
    .fill(0)
    .map((_, i) => common(lines, i))
    .join(""),
  2
);

let epsilon = gamma ^ ((1 << bits) - 1);

console.log(gamma * epsilon);

let oxygen = lines.slice();
let co2 = lines.slice();

for (let bit = 0; bit < bits && oxygen.length > 1; bit++) {
  let c = common(oxygen, bit);
  oxygen = oxygen.filter((l) => l[bit] == c);
}

for (let bit = 0; bit < bits && co2.length > 1; bit++) {
  let c = common(co2, bit) == "1" ? "0" : "1";
  co2 = co2.filter((l) => l[bit] == c);
}

console.log(parseInt(oxygen.join(""), 2) * parseInt(co2.join(""), 2));
