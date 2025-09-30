const txt = await Bun.file("1.txt").text();
const input = Number(txt.trim());

for (let i = 0; ; i++) {
  const total = i * i;

  if (total > input) {
    const toBuy = total - input;
    const width = i * 2 - 1;

    console.log(toBuy * width);
    break;
  }
}
