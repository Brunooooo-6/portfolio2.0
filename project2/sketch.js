let pumpkins = [];
let currentPumpkin = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pumpkins = [
    new Pumpkin('happy', color(255, 140, 0)),
    new Pumpkin('angry', color(255, 100, 0)),
    new Pumpkin('shocked', color(255, 160, 0))
  ];
}

function draw() {
  background(20);
  pumpkins[currentPumpkin].updatePosition(mouseX, mouseY);
  pumpkins[currentPumpkin].draw();
  fill(255);
  noStroke();
  textSize(16);
  text("Click to change expression", 20, 30);
}

function mousePressed() {
  currentPumpkin = (currentPumpkin + 1) % pumpkins.length;
}

class Pumpkin {
  constructor(expression, color) {
    this.expression = expression;
    this.color = color;
    this.x = width/2; this.y = height/2;
    this.size = 180;
  }
  updatePosition(x, y) { this.x = x; this.y = y; }
  draw() {
    push();
    translate(this.x, this.y);
    fill(this.color);
    noStroke();
    ellipse(0, 0, this.size, this.size * 0.9);
    fill(0);
    if(this.expression === 'happy') {
      arc(0, 20, 80, 80, 0, PI, CHORD);
      ellipse(-30, -20, 20, 30); ellipse(30, -20, 20, 30);
    } else if(this.expression === 'angry') {
      arc(0, 30, 80, 80, PI, TWO_PI, CHORD);
      triangle(-30, -10, -40, -30, -20, -30); triangle(30, -10, 40, -30, 20, -30);
    } else {
      ellipse(0, 30, 60, 60);
      ellipse(-30, -20, 30, 30); ellipse(30, -20, 30, 30);
    }
    fill(34, 139, 34);
    rect(-10, -this.size*0.5, 20, 30);
    pop();
  }
}
