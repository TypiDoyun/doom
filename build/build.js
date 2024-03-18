var grid = 16;
var gradients = [];
var gradients2 = [];
function getRandomUnitVector() {
    var theta = Math.random() * Math.PI * 2;
    return createVector(Math.cos(theta), Math.sin(theta));
}
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    createCanvas(windowWidth, windowHeight);
    noFill();
    noStroke();
    frameRate(10);
    for (var y = 0; y <= grid; y++) {
        var row = [];
        for (var x = 0; x <= grid; x++) {
            row.push(getRandomUnitVector());
        }
        gradients.push(row);
    }
    for (var y = 0; y <= grid * 4; y++) {
        var row = [];
        for (var x = 0; x <= grid * 4; x++) {
            row.push(getRandomUnitVector());
        }
        gradients2.push(row);
    }
    var g = 400;
    for (var y = 0; y < g; y += 1) {
        for (var x = 0; x < g; x += 1) {
            var point_1 = createVector((x * windowWidth / g) + (windowWidth / g / 2), (y * windowHeight / g) + (windowHeight / g / 2));
            var value1 = getNoise(grid, gradients, point_1.x, point_1.y, "setup") + 1;
            var value2 = getNoise(grid * 2, gradients2, point_1.x, point_1.y, "setup") + 1;
            var value = value1 * 0.6 + value2 * 0.4;
            var hex_1 = Math.round(value / 2 * 255).toString(16);
            var h = hex_1.length === 1 ? "0" + hex_1 : hex_1;
            drawRect(x * windowWidth / g, y * windowHeight / g, Math.ceil(windowWidth / g), Math.ceil(windowHeight / g), "#" + h + h + h);
        }
    }
}
function drawRect(x, y, w, h, color) {
    fill(color);
    rect(x, y, w, h);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function ease(x) {
    return (6 * Math.pow(x, 5) - 15 * Math.pow(x, 4) + 10 * Math.pow(x, 3));
}
function lerpEasing(from, to, t) {
    return from + (to - from) * ease(t);
}
function dotProduct(a, b) {
    return a.x * b.x + a.y * b.y;
}
function getNoise(grid, gradients, x, y, where) {
    var gridVector = toGridVector(grid, x, y);
    var x0 = Math.floor(gridVector.x);
    var y0 = Math.floor(gridVector.y);
    var x1 = x0 + 1;
    var y1 = y0 + 1;
    var a = dotProduct(gradients[y0][x0], createVector(gridVector.x - x0, gridVector.y - y0));
    var b = dotProduct(gradients[y0][x1], createVector(gridVector.x - x1, gridVector.y - y0));
    var c = dotProduct(gradients[y1][x0], createVector(gridVector.x - x0, gridVector.y - y1));
    var d = dotProduct(gradients[y1][x1], createVector(gridVector.x - x1, gridVector.y - y1));
    return lerpEasing(lerpEasing(a, b, gridVector.x - x0), lerpEasing(c, d, gridVector.x - x0), gridVector.y - y0);
}
function getVector(grid, x, y) {
    return createVector(windowWidth / grid * x, windowHeight / grid * y);
}
function toGridVector(grid, x, y) {
    return createVector(x / windowWidth * grid, y / windowHeight * grid);
}
function draw() {
}
//# sourceMappingURL=build.js.map