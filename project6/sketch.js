/* 1. 保留所有原始变量 */
let data;
let categories;
let colors;
let currentDay = 0;
let animationProgress = 0;
let centerSize;
let graphSize;

function setup() {
    /* 2. 升级为自适应画布 */
    createCanvas(windowWidth, windowHeight);
    
    // 调整 graphSize 的比例，确保在 iframe 中能完整显示
    // 原版 1.7 在全屏下很酷，但在小窗口里可能会切边，这里改为基于 min(width, height)
    graphSize = min(width, height) * 0.8; 
    centerSize = graphSize / 5;
    
    textAlign(CENTER, CENTER);
    angleMode(DEGREES);
    
    // 你的原始数据
    data = [
        {day: 'Monday', wechat: 40, chrome: 30, youtube: 70, music: 30, others: 20},
        {day: 'Tuesday', wechat: 50, chrome: 40, youtube: 60, music: 40, others: 20},
        {day: 'Wednesday', wechat: 40, chrome: 30, youtube: 50, music: 30, others: 20},
        {day: 'Thursday', wechat: 50, chrome: 20, youtube: 60, music: 40, others: 30},
        {day: 'Friday', wechat: 40, chrome: 30, youtube: 50, music: 30, others: 20},
        {day: 'Saturday', wechat: 70, chrome: 60, youtube: 120, music: 60, others: 30},
        {day: 'Sunday', wechat: 49, chrome: 48, youtube: 95, music: 54, others: 14}
    ];
    
    categories = ['WeChat&Instagram', 'Chrome&Safari', 'Youtube&Bilibili', 'Music', 'Others'];
    // 修复了之前代码中的颜色拼写错误 '#7BBBCO' -> '#7BBBC0'
    colors = ['#FFEBAD', '#FEB737', '#A7B5FE', '#7BBBC0', '#543786'];
}

function draw() {
    background(0);
    
    // 顶部日期
    fill(255);
    textSize(width < 400 ? 20 : 28); // 移动端自适应字号
    textStyle(BOLD);
    text(data[currentDay].day, width/2, 40);

    let total = calculateTotal(data[currentDay]);
    let startAngle = -90;
    const sectorAngle = 72;
    const maxSize = graphSize;

    push();
    translate(width/2, height/2);
    // 保留旋转动画
    rotate(animationProgress * 180);

    let sizeMultiplier = calculateSizeMultiplier(animationProgress);

    for (let i = 0; i < categories.length; i++) {
        let category = getCategoryName(categories[i]);
        let value = data[currentDay][category];
        // 保留原有的映射逻辑
        let sectorSize = map(value, 0, 120, centerSize, maxSize) * sizeMultiplier;

        fill(colors[i]);
        noStroke();
        arc(0, 0, sectorSize, sectorSize, startAngle, startAngle + sectorAngle);
        startAngle += sectorAngle;
    }
    pop();

    // 中央圆圈
    fill(0);
    ellipse(width/2, height/2, centerSize);

    fill(255);
    textSize(centerSize / 5);
    text("Screen\nTime", width/2, height/2);

    // 底部图例 - 保留你的原始循环逻辑
    textSize(10);
    let labelY = height - 30;
    for (let i = 0; i < categories.length; i++) {
        let labelX = map(i, 0, categories.length - 1, 60, width - 60);
        fill(colors[i]);
        ellipse(labelX, labelY - 12, 8);
        fill(255);
        text(categories[i], labelX, labelY);
    }

    // 更新动画进度
    animationProgress += 0.005; // 稍微减慢一点速度，让数据更清晰
    if (animationProgress >= 1) {
        animationProgress = 0;
        currentDay = (currentDay + 1) % data.length;
    }
}

/* 3. 保留所有原始逻辑函数 */

function calculateTotal(dayData) {
    let sum = 0;
    for (let key in dayData) {
        if (typeof dayData[key] === 'number') {
            sum += dayData[key];
        }
    }
    return sum;
}

function calculateSizeMultiplier(progress) {
    if (progress <= 0.5) {
        return map(progress, 0, 0.5, 0, 1);
    } else {
        return map(progress, 0.5, 1, 1, 0);
    }
}

function getCategoryName(category) {
    return category.toLowerCase().split('&')[0];
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    graphSize = min(width, height) * 0.8;
    centerSize = graphSize / 5;
}