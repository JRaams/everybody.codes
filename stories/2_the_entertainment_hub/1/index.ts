export function findFinalSlot(machine: string[][], token: string, slot: number): number {
  const behaviours = token.split('');

  let x = slot * 2;
  let y = 0;
  
  for (let i = 0; i < behaviours.length; i++) {
    while (machine[y]?.[x] === '.') y++;
    
    if (behaviours[i] === 'L') {
      x += x === 0 ? 1 : -1;
    } else {
      x += x === machine[y]!.length - 1  ? -1 : 1;
    }

    if (y >= machine.length - 1) {
      return Math.floor(x / 2) + 1;
    }
  }

  throw new Error("No final slot found");
}