let grid = 16;
const gradients: p5.Vector[][] = [];
const gradients2: p5.Vector[][] = [];

function getRandomUnitVector() {
    const theta = Math.random() * Math.PI * 2;

    return createVector(Math.cos(theta), Math.sin(theta));
}

function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    
    createCanvas(windowWidth, windowHeight);
    noFill();
    noStroke();
    frameRate(10);

    for (let y = 0; y <= grid; y++) {
        const row: p5.Vector[] = [];
        for (let x = 0; x <= grid; x++) {
            row.push(getRandomUnitVector());
        }
        gradients.push(row);
    }
    for (let y = 0; y <= grid * 4; y++) {
        const row: p5.Vector[] = [];
        for (let x = 0; x <= grid * 4; x++) {
            row.push(getRandomUnitVector());
        }
        gradients2.push(row);
    }

    let g = 400;

    for (let y = 0; y < g; y += 1) {
        for (let x = 0; x < g; x += 1) {

            const point = createVector((x * windowWidth / g) + (windowWidth / g / 2), (y * windowHeight / g) + (windowHeight / g / 2));
            const value1 = getNoise(grid, gradients, point.x, point.y, "setup") + 1;
            const value2 = getNoise(grid * 2, gradients2, point.x, point.y, "setup") + 1;
            const value = value1 * 0.6 + value2 * 0.4;
            
            const hex = Math.round(value / 2 * 255).toString(16);
            const h = hex.length === 1 ? "0" + hex : hex;

            drawRect(x * windowWidth / g, y * windowHeight / g, Math.ceil(windowWidth / g), Math.ceil(windowHeight / g), `#${h}${h}${h}`);
            
        }
    }
}

function drawRect(x: number, y: number, w: number, h: number, color: string) {
    fill(color);
    rect(x, y, w, h);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function ease(x: number) {
    return (6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3); 
}

function lerpEasing(from: number, to: number, t: number) {
    return from + (to - from) * ease(t);
}

function dotProduct(a: p5.Vector, b: p5.Vector) {
    return a.x * b.x + a.y * b.y;
}

function getNoise(grid: number, gradients: p5.Vector[][], x: number, y: number, where: string) {
    const gridVector = toGridVector(grid, x, y);
    const x0 = Math.floor(gridVector.x);
    const y0 = Math.floor(gridVector.y);
    const x1 = x0 + 1;
    const y1 = y0 + 1;

    // console.log(`{ ${x0} ${y0} } ~ { ${x1} ${y1} } ${where}`);


    const a = dotProduct(gradients[y0][x0], createVector(gridVector.x - x0, gridVector.y - y0));
    const b = dotProduct(gradients[y0][x1], createVector(gridVector.x - x1, gridVector.y - y0));
    const c = dotProduct(gradients[y1][x0], createVector(gridVector.x - x0, gridVector.y - y1));
    const d = dotProduct(gradients[y1][x1], createVector(gridVector.x - x1, gridVector.y - y1));

    return lerpEasing(lerpEasing(a, b, gridVector.x - x0), lerpEasing(c, d, gridVector.x - x0), gridVector.y - y0);
}

function getVector(grid: number, x: number, y: number) {
    return createVector(windowWidth / grid * x, windowHeight / grid * y);
}

function toGridVector(grid: number, x: number, y: number) {
    return createVector(x / windowWidth * grid, y / windowHeight * grid);
}

function draw() {
    // background("#fff");
}