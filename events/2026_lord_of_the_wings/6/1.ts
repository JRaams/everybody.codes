const lines = await Bun.file("1.txt").text();
const input = lines.trim().split("\n");

const m = new Map<string, string[]>();

input.forEach((line) => {
  const [product, ingredientsStr] = line.split(":");
  const ingredients = ingredientsStr.split(",");
  m.set(product, ingredients);
});

const visited = new Set<string>();
const queue = ["NULL"];

while (queue.length > 0) {
  const item = queue.shift()!;

  if (visited.has(item)) continue;
  visited.add(item);

  m.get(item)?.forEach((ingredient) => {
    queue.push(ingredient);
  });
}

console.log(visited.size - 1);
