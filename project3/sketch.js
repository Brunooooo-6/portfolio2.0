/* 1. 保留原始变量设计 */
let cupFill = 0;
let bottleFill = 0;
let bathtubFill = 0;
let lastSecond = -1;

function setup() {
    /* 2. 升级为自适应画布，以填满网页容器 */
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    /* 保持你的原始背景色 */
    background(200);
    
    // 计算动态间距，确保在不同大小的窗口中都能居中
    let spacing = width / 4;
    let baseline = height * 0.8; // 统一底部基准线
    
    // --- 3. 核心绘图部分：完全保留你的原始逻辑 ---

    // Cup (fills in 1 second)
    drawCup(spacing - 30, baseline, 60, 80, cupFill, 'Cup');
    if (second() !== 0) {
        cupFill = map(millis() % 1000, 0, 1000, 0, 100);
    }
    
    // Bottle (fills in 1 minute)
    drawBottle(spacing * 2 - 25, baseline, 50, 120, bottleFill, 'Bottle');
    let currentSecond = second();
    if (currentSecond !== lastSecond) {
        if (bottleFill < 100) {
            bottleFill += 100 / 60; 
        } else {
            bottleFill = 0; 
        }
        lastSecond = currentSecond;
    }
    
    // Bathtub (fills in 1 hour)
    drawBathtub(spacing * 3 - 90, baseline, 180, 150, bathtubFill, 'Bathtub');
    if (frameCount % 60 === 0 && bathtubFill < 100) {
        bathtubFill += 100 / 3600; 
    }
    
    // --- 4. 时间显示 ---
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text(`Time: ${nf(hour(), 2)}:${nf(minute(), 2)}:${nf(second(), 2)}`, width / 2, 50);
}

/* 5. 你的原始绘制函数（完全未改动逻辑，仅确保坐标对齐） */

function drawCup(x, y, w, h, fillPercentage, label) {
    push();
    translate(x, y);
    noFill();
    stroke(0);
    beginShape();
    vertex(w * 0.2, 0);
    vertex(0, -h);
    vertex(w, -h);
    vertex(w * 0.8, 0);
    endShape(CLOSE);
    
    noStroke();
    fill(0, 150, 255);
    let fillHeight = map(fillPercentage, 0, 100, 0, h);
    beginShape();
    vertex(w * 0.2, 0);
    vertex(lerp(w * 0.2, 0, fillHeight / h), -fillHeight);
    vertex(lerp(w * 0.8, w, fillHeight / h), -fillHeight);
    vertex(w * 0.8, 0);
    endShape(CLOSE);
    
    fill(0);
    textSize(12);
    textAlign(CENTER);
    text(label, w / 2, 20);
    pop();
}

function drawBottle(x, y, w, h, fillPercentage, label) {
    push();
    translate(x, y);
    noFill();
    stroke(0);
    rect(0, -h, w, h);
    
    noStroke();
    fill(0, 150, 255);
    let fillHeight = map(fillPercentage, 0, 100, 0, h);
    rect(0, 0 - fillHeight, w, fillHeight);
    
    fill(0);
    textSize(12);
    textAlign(CENTER);
    text(label, w / 2, 20);
    pop();
}

function drawBathtub(x, y, w, h, fillPercentage, label) {
    push();
    translate(x, y);
    noFill();
    stroke(0);
    beginShape();
    vertex(0, 0);
    vertex(0, -h * 0.2);
    bezierVertex(0, -h, w * 0.1, -h, w * 0.2, -h);
    vertex(w * 0.8, -h);
    bezierVertex(w * 0.9, -h, w, -h, w, -h * 0.2);
    vertex(w, 0);
    endShape(CLOSE);
    
    noStroke();
    fill(0, 150, 255);
    let fillHeight = map(fillPercentage, 0, 100, 0, h);
    beginShape();
    vertex(0, 0);
    vertex(0, -fillHeight);
    if (fillHeight > h * 0.2) {
        bezierVertex(0, -fillHeight, w * 0.1, -fillHeight, w * 0.2, -fillHeight);
        vertex(w * 0.8, -fillHeight);
        bezierVertex(w * 0.9, -fillHeight, w, -fillHeight, w, -fillHeight);
    } else {
        vertex(w, -fillHeight);
    }
    vertex(w, 0);
    endShape(CLOSE);
    
    fill(0);
    textSize(16);
    textAlign(CENTER);
    text(label, w / 2, 20);
    pop();
}

/* 6. 添加响应式调整，当窗口改变大小时自动重绘 */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}