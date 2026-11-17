const txt = await Bun.file("3.txt").text();

// Ported from light_ln2's and michelkraemer's solutions
function processOneShade(data: Uint8Array) {
  const nextData = new Uint8Array(data.length);
  const shade = data[0];

  let numFlips = 0;
  let write = 0;
  let left = 0;
  let right = data.length - 1;

  while (left <= right) {
    // Skip this shade's group on the left.
    while (data[left] === shade) left++;

    // Copy other shades inward from the right.
    while (left <= right && data[right] !== shade) {
      nextData[write++] = data[right--];
    }
    if (left <= right) numFlips += right - left + 1;

    // Skip this shade's group on the right.
    while (left <= right && data[right] === shade) right--;

    // Copy other shades inward from the left.
    while (left <= right && data[left] !== shade) {
      nextData[write++] = data[left++];
    }
    if (left <= right) numFlips += right - left + 1;
  }

  return {
    numFlips,
    remaining: nextData.subarray(0, write),
  };
}

const input = new TextEncoder().encode(txt.trim());

let data: Uint8Array<ArrayBufferLike> = new Uint8Array(input.length * 100);

for (let i = 0; i < 100; i++) {
  data.set(input, i * input.length);
}

let total = 0;

while (data.length > 0) {
  const pass = processOneShade(data);
  total += pass.numFlips;
  data = pass.remaining;
}

console.log(total);
