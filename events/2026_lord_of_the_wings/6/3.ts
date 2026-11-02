const lines = await Bun.file("3.txt").text();
const input = lines.trim().split("\n");

const m = new Map<string, string[]>();

input.forEach((line) => {
  const [product, ingredientsStr] = line.split(":");
  const ingredients = ingredientsStr.split(",");
  m.set(product, ingredients);
});

let result = 0;

for (const product of m.keys()) {
  if (product === "NULL") continue;

  const visited = new Set<string>();
  const queue = [product];
  const nulls = new Set<string>();

  while (queue.length > 0) {
    const item = queue.shift()!;

    if (item.startsWith("NULL")) {
      nulls.add(item);

      if (nulls.size === 2) {
        result++;
        break;
      }
    }

    if (visited.has(item)) continue;
    visited.add(item);

    m.get(item)?.forEach((ingredient) => {
      queue.push(ingredient);
    });
  }
}

console.log(result);
