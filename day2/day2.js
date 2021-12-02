import { getInput } from "../util/aoc.js";

let input = await getInput(2);

let testinput = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

//input = testinput;

let x = 0;
let d = 0;

input.split("\n").forEach((i) => {
  let [dir, n] = i.split(" ");
  n = parseInt(n);

  if (dir == "down") d += n;
  else if (dir == "up") d -= n;
  else if (dir == "forward") x += n;
});

x = 0;
let aim = 0;
d = 0;

input.split("\n").forEach((i) => {
  let [dir, n] = i.split(" ");
  n = parseInt(n);

  if (dir == "down") aim += n;
  else if (dir == "up") aim -= n;
  else if (dir == "forward") {
    x += n;
    d += aim * n;
  }
});

console.log(x * d);
