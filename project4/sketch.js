let headOffset = 0;
let bodyOffset = 0;
let legsOffset = 0;
let amplitude = 50;
let speed = 0.1;

// 颜色变量
let headColor;
let bodyColor;
let legsColor;
let leftTentacleColor;
let rightTentacleColor;
let centerTentacleColors = [];

function setup() {
    /* 1. 升级为自适应画布 */
    createCanvas(windowWidth, windowHeight);
    stroke(0);
    noFill();
    
    // 初始化颜色
    headColor = color(255);
    bodyColor = color(255);
    legsColor = color(255);
    leftTentacleColor = color(255);
    rightTentacleColor = color(255);
    centerTentacleColors = [color(255), color(255)];
}

/* 2. 保留完整的点击交互逻辑 */
function mousePressed() {
    let newColor = color(random(255), random(255), random(255));
    
    // 基于高度比例进行点击判定 (因为画布高度变了，所以用比例更精准)
    let sectionH = height / 3;

    if (mouseY < sectionH) {
        let headX = 220 + headOffset;
        if (mouseX > headX - 50 && mouseX < headX + 210) {
            headColor = newColor;
        }
    }
    else if (mouseY < sectionH * 2) {
        let bodyX = 300 + bodyOffset;
        if (mouseX > bodyX - 140 && mouseX < bodyX + 140) {
            bodyColor = newColor;
        }
    }
    else {
        let legsX = 220 + legsOffset;
        if (mouseX > legsX && mouseX < legsX + 160 && mouseY < sectionH * 2 + 120) {
            legsColor = newColor;
        }
        else if (mouseX < legsX + 20) {
            leftTentacleColor = newColor;
        }
        else if (mouseX > legsX + 140) {
            rightTentacleColor = newColor;
        }
        else {
            let spacing = 160 / 3;
            let firstTentacleX = legsX + 20 + spacing;
            let secondTentacleX = legsX + 20 + 2 * spacing;
            
            if (abs(mouseX - firstTentacleX) < 20) {
                centerTentacleColors[0] = newColor;
            } else if (abs(mouseX - secondTentacleX) < 20) {
                centerTentacleColors[1] = newColor;
            }
        }
    }
}

function draw() {
    background(255);

    updateOffsets();
    drawDividers();
    
    // 将绘制位置锁定在画面中心
    push();
    let verticalShift = (height - 600) / 2; // 如果高度不是600，则垂直居中
    translate(0, verticalShift);
    
    drawHead(headOffset, 220, 50, 380, 180);
    drawBody(bodyOffset, 300, 300);
    drawLegsAndTentacles(legsOffset, 220, 400, 160, 120);
    
    pop();
}

/* 3. 核心绘图函数：完全保留你的原始设计 */

function updateOffsets() {
    headOffset = sin(frameCount * speed) * amplitude;
    bodyOffset = sin(frameCount * speed + PI/3) * amplitude;
    legsOffset = sin(frameCount * speed + 2*PI/3) * amplitude;
}

function drawDividers() {
    let h1 = height / 3;
    let h2 = (height / 3) * 2;
    line(0, h1, width, h1);
    line(0, h2, width, h2);
}

function drawHead(offset, x1, y1, x2, y2) {
    push();
    translate(offset, 0);
    fill(headColor);
    drawTrapezoid(x1, y1, x2, y2);
    drawEyes(250, 140, 350, 140, 30);
    drawNeck(275, 180, 50, 20);
    pop();
}

function drawTrapezoid(x1, y1, x2, y2) {
    beginShape();
    vertex(x1, y1); vertex(x2, y1); vertex(x2 + 50, y2); vertex(x1 - 50, y2);
    endShape(CLOSE);
}

function drawEyes(x1, y, x2, y2, size) {
    fill(0); circle(x1, y, size); circle(x2, y2, size); noFill();
}

function drawNeck(x, y, w, h) { rect(x, y, w, h); }

function drawBody(offset, centerX, centerY) {
    push();
    translate(offset, 0);
    fill(bodyColor);
    ellipse(centerX, centerY, 280, 190);
    drawClasps(centerX, centerY);
    drawArms(165, 280, 435, 280);
    pop();
}

function drawClasps(x, y) {
    circle(x, y - 60, 20); circle(x, y - 20, 20); circle(x, y + 20, 20);
}

function drawArms(x1, y1, x2, y2) {
    line(x1, y1, x1 - 65, y1 - 80);
    line(x2, y2, x2 + 65, y2 - 80);
}

function drawLegsAndTentacles(offset, x, y, w, h) {
    push();
    translate(offset, 0);
    fill(legsColor);
    rect(x, y, w, h);
    let spacing = (w - 40) / 3;
    for(let i = 0; i < 2; i++) {
        fill(centerTentacleColors[i]);
        ellipse(x + 20 + ((i+1) * spacing), y + h, 40, 100);
    }
    fill(leftTentacleColor);
    drawCombinedTentacle(x + 20, y + h, -1);
    fill(rightTentacleColor);
    drawCombinedTentacle(x + w - 20, y + h, 1);
    pop();
}

function drawCombinedTentacle(x, y, direction) {
    beginShape();
    let points = [];
    for (let t = 0; t <= 1; t += 0.05) {
        let px = x + (direction * t * 40);
        let py = y - (t * t * 80);
        points.push({x: px + (20 * direction), y: py});
        vertex(px + (20 * direction), py);
    }
    for (let i = points.length - 1; i >= 0; i--) {
        vertex(points[i].x - (40 * direction), points[i].y);
    }
    endShape(CLOSE);
}

// 适配窗口调整
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}