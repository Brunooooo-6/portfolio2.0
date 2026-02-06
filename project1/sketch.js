let blendModes;
let index = 0;
let currBlendMode;
let angle = 0;

function setup() {
  createCanvas(windowWidth, windowHeight); // 适配窗口
  blendModes = [BLEND, ADD, DARKEST, LIGHTEST, DIFFERENCE, EXCLUSION, MULTIPLY, OVERLAY, HARD_LIGHT, SOFT_LIGHT, DODGE, BURN];
  currBlendMode = blendModes[index];
  
  let btn = createButton("Change blendMode");
  btn.position(20, 80);
  btn.mousePressed(changeBlendMode);
}

function draw() {
  clear();
  fill(255);
  noStroke();
  textSize(16);
  text('Click button to change mode', 20, 30);
  text("Current: " + currBlendMode, 20, 55);
  
  blendMode(currBlendMode);
  angle += 0.01;
  drawCap(angle);
}

function drawCap(rot) {
  push();
  translate(width/2, height/2); // 居中绘制
  rotate(rot);
  fill(33, 60, 99);
  arc(0, 0, 200, 150, PI, 0);
  fill(48, 87, 145);
  circle(0, -80, 20);
  fill(0);
  beginShape();
  vertex(-100, 0); vertex(100, 0); vertex(75, 25); vertex(-75, 25);
  endShape(CLOSE);
  stroke(255);
  strokeWeight(2);
  line(-30, -70, 30, -70);
  pop();
}

function changeBlendMode() {
  index = (index + 1) % blendModes.length;
  currBlendMode = blendModes[index];
}
