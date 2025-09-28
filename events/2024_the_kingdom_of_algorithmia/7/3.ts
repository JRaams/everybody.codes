import { loadTrack, simulate } from "./track";

const input = await Bun.file("3.txt").text();

const track = loadTrack(
  `S+= +=-== +=++=     =+=+=--=    =-= ++=     +=-  =+=++=-+==+ =++=-=-=--
- + +   + =   =     =      =   == = - -     - =  =         =-=        -
= + + +-- =-= ==-==-= --++ +  == == = +     - =  =    ==++=    =++=-=++
+ + + =     +         =  + + == == ++ =     = =  ==   =   = =++=
= = + + +== +==     =++ == =+=  =  +  +==-=++ =   =++ --= + =
+ ==- = + =   = =+= =   =       ++--          +     =   = = =--= ==++==
=     ==- ==+-- = = = ++= +=--      ==+ ==--= +--+=-= ==- ==   =+=    =
-               = = = =   +  +  ==+ = = +   =        ++    =          -
-               = + + =   +  -  = + = = +   =        +     =          -
--==++++==+=+++-= =-= =-+-=  =+-= =-= =--   +=++=+++==     -=+=++==+++-`
);

const rivalActions = input.trim().split(":")[1].split(",");
const rivalScore = simulate(track, rivalActions, 11);

function* findAllPlans(
  plan: string[],
  plus: number,
  minus: number,
  equal: number
): Generator<string> {
  if (plus === 0 && minus === 0 && equal === 0) {
    yield plan.join("");
    return;
  }

  if (plus > 0) {
    plan.push("+");
    yield* findAllPlans(plan, plus - 1, minus, equal);
    plan.pop();
  }

  if (minus > 0) {
    plan.push("-");
    yield* findAllPlans(plan, plus, minus - 1, equal);
    plan.pop();
  }

  if (equal > 0) {
    plan.push("=");
    yield* findAllPlans(plan, plus, minus, equal - 1);
    plan.pop();
  }
}

let winningPlans = 0;

for (const plan of findAllPlans([], 5, 3, 3)) {
  const score = simulate(track, plan.split(""), 11);
  if (score > rivalScore) {
    winningPlans++;
  }
}

console.log(winningPlans);
