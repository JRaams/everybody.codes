import { applyLava, parse } from "./vulcano";

const { grid, volcano } = await parse("1.txt");

const { destroyed } = applyLava(grid, volcano, 10);

console.log(destroyed);
