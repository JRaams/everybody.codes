const lines = await Bun.file("1.txt").text();
const input = lines.split("");

let result = 0;

for (let i = 0; i < input.length; i++) {
  switch (input[i]) {
    case "A":
      break;
    case "B":
      result += 1;
      break;
    case "C":
      result += 3;
      break;
    default:
      throw new Error(`Invalid input: ${input[i]}`);
  }
}

console.log(result);
