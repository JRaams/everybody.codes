const txt = await Bun.file("3.txt").text();

const priests = Number(txt.trim());
// const acolytes = 5;
// const available = 160;
const acolytes = 10;
const available = 202400000;

let thickness = 1;
let blocks = 1;

const heights: number[] = [1];

for (let layer = 1; ; layer++) {
  thickness = ((thickness * priests) % acolytes) + acolytes;

  const width = 2 * layer + 1;

  blocks += thickness * width;

  for (let i = 0; i < heights.length; i++) {
    heights[i] += thickness;
  }
  heights.push(thickness);

  let workingBlocks = blocks;

  const middleAir = (priests * width * heights[0]) % acolytes;
  workingBlocks -= middleAir;

  for (let i = 1; i < heights.length - 1; i++) {
    const air = (priests * width * heights[i]) % acolytes;
    workingBlocks -= air * 2;
  }

  if (workingBlocks > available) {
    console.log(workingBlocks - available);
    break;
  }
}

/**
				1										1				
			1	1	1								1	1	1			
			1	1	1								1	1	1			
			1	1	1								1	1	1			
			1	1	1								1	1	1			
			1	1	1								1	1	1			
			1	1	1								1	1	1			
			1	1	1								1	1	1			
		1	1	1	1	1						1	1	1	1	1		
		1	1	1	1	1						1	1	1	1	1		
		1	1	1	1	1						1	1	1	1	1		
		1	1	1	1	1						1	1	1	1	1		
		1	1	1	1	1						1	1	1	1	1		
		1	1	1	1	1						1	1	1	1	1		
		1	1	1	1	1						1	1	1	1	1		
		1	1	1	1	1						1	1	1	1	1		
		1	1	1	1	1						1	1	1	1	1		
	1	1	1	1	1	1	1				1	1	1	1	1	1	1	
	1	1	1	1	1	1	1				1	1	1	1	1	1	1	
	1	1	1	1	1	1	1				1	1	1	1	1	1	1	
	1	1	1	1	1	1	1				1	1	1	1	1	1	1	
	1	1	1	1	1	1	1				1	1	1	1	1	1	1	
	1	1	1	1	1	1	1				1	1	1	1	1	1	1	
	1	1	1	1	1	1	1				1	1	1	1	1	1	1	
	1	1	1	1	1	1	1				1	1	1	1	1	1	1	
1	1	1	1	1	1	1	1	1		1	1	1	1	1	1	1	1	1
1	1	1	1	1	1	1	1	1		1	1	1	1	1	1	1	1	1
1	1	1	1	1	1	1	1	1		1	1		1	1	1		1	1
1	1	1	1	1	1	1	1	1		1	1		1		1		1	1
1	1	1	1	1	1	1	1	1		1			1		1			1
1	1	1	1	1	1	1	1	1		1			1		1			1
 */
