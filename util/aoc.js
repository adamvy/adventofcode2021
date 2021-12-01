import { access, readFile, writeFile } from "fs/promises";
import { constants } from "fs";
import { session } from "../config.js";
import { get } from "https";

export async function getInput(day) {
  let filename = `input${day}.txt`;
  try {
    await access(filename, constants.R_OK);
    return await readFile(filename, { encoding: "utf8" });
  } catch (e) {
    return await new Promise((resolve, reject) => {
      get(
        `https://adventofcode.com/2021/day/${day}/input`,
        {
          headers: {
            cookie: `session=${session}`,
          },
        },
        (res) => {
          let input = "";
          res.setEncoding("utf8");
          res.on("data", (c) => (input += c));
          res.on("end", async function () {
            await writeFile(filename, input, { encoding: "utf8" });
            resolve(input);
          });
        }
      );
    });
  }
}
