let angleOffset = 0; 

function setup() {
  createCanvas(600, 600); 
}

function draw() {
  background(0);
  let maxLines = 20; 
  let baseRadius = 40; 
  let spacing = 40; 

  for (let i = 0; i < maxLines; i++) {
    let numCircles = 4 + i; 
    let yPos = height - (i + 1) * spacing; 
    let currentRadius = baseRadius * (1 - i * 0.05); 

    // Adjust currentRadius based on yPos
    if (yPos < height / 3) {
      currentRadius *= 1.2; 
    } else if (yPos < (2 * height) / 3) {
      currentRadius *= 1.0; 
    } else {
      currentRadius *= 0.8; 
    }
    
    for (let j = 0; j < numCircles; j++) {
      let xPos = width / 2 + (j - (numCircles - 1) / 2) * (currentRadius * 2 + spacing); 
      
      // Calculate color based on position
      let hueValue = map(sin(angleOffset + j * 0.5 + i * 0.1), -1, 1, 0, 255); 
      let shapeColor = color(hueValue, 100, 255); // Use a vibrant color palette

      // Draw circle around the spiral
      noStroke();
      fill(shapeColor); 
      ellipse(xPos, yPos, currentRadius * 2); 
      
     
      drawSpiral(xPos, yPos, currentRadius, angleOffset + j * 0.2, shapeColor); 
    }
  }
  
  angleOffset += 0.05; 
}

// Function to draw a spiral
function drawSpiral(x, y, radius, angle, shapeColor) {
  let points = 200; 
  
  fill(shapeColor.levels[0], shapeColor.levels[1], shapeColor.levels[2], 150); 
  stroke(0);
  beginShape();
  for (let i = 0; i < points; i++) {
    let t = map(i, 0, points, 0, TWO_PI * 5); 
    
    let r = radius * (1 - t / (TWO_PI * 5)); 
    let xPos = x + r * cos(t + angle); 
    let yPos = y + r * sin(t + angle); 
    vertex(xPos, yPos); 
  }
  endShape(); 
}