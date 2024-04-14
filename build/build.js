class Vector {
    constructor(x, y, z) {
        this.values = [x, y, z];
    }
    static get ZERO() {
        return new Vector(0, 0, 0);
    }
    static from(vector) {
        return new Vector(vector.x, vector.y, vector.z);
    }
    get x() {
        return this.values[0];
    }
    get y() {
        return this.values[1];
    }
    get z() {
        return this.values[2];
    }
    set x(value) {
        this.values[0] = value;
    }
    set y(value) {
        this.values[1] = value;
    }
    set z(value) {
        this.values[2] = value;
    }
    get(index) {
        return this.values[index];
    }
    set(index, value) {
        this.values[index] = value;
    }
    equals(other) {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }
    fromOrigin(origin) {
        return new Vector(this.x - origin.x, this.y - origin.y, this.z - origin.z);
    }
    get lengthSquared() {
        return this.x ** 2 + this.y ** 2 + this.z ** 2;
    }
    get length() {
        return this.lengthSquared ** 0.5;
    }
    set length(value) {
        const length = this.length;
        this.x *= value / length;
        this.y *= value / length;
        this.z *= value / length;
    }
    get clone() {
        return Vector.from(this);
    }
    get normalized() {
        const clone = this.clone;
        clone.length = 1;
        return clone;
    }
    add(value) {
        if (typeof value === 'number') {
            this.x += value;
            this.y += value;
            this.z += value;
        }
        else {
            this.x += value.x;
            this.y += value.y;
            this.z += value.z;
        }
        return this;
    }
    sub(value) {
        if (typeof value === 'number') {
            this.x -= value;
            this.y -= value;
            this.z -= value;
        }
        else {
            this.x -= value.x;
            this.y -= value.y;
            this.z -= value.z;
        }
        return this;
    }
    multiply(value) {
        if (typeof value === 'number') {
            this.x *= value;
            this.y *= value;
            this.z *= value;
        }
        else {
            this.x *= value.x;
            this.y *= value.y;
            this.z *= value.z;
        }
        return this;
    }
    divide(value) {
        if (typeof value === 'number') {
            this.x /= value;
            this.y /= value;
            this.z /= value;
        }
        else {
            this.x /= value.x;
            this.y /= value.y;
            this.z /= value.z;
        }
        return this;
    }
    dot(vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }
    cross(vector) {
        return new Vector(this.y * vector.z - this.z * vector.y, this.x * vector.z - this.z * vector.x, this.x * vector.y - this.y * vector.x);
    }
    rotateX(degrees, origin = Vector.ZERO) {
        if (degrees === 0)
            return this.clone;
        const y = this.y - origin.y;
        const z = this.z - origin.z;
        const radians = degrees * Math.PI / 180;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        this.y = Math.round(Vector.EPSILON * (cos * y - sin * z)) / Vector.EPSILON + origin.y;
        this.z = Math.round(Vector.EPSILON * (sin * y + cos * z)) / Vector.EPSILON + origin.z;
        return this;
    }
    rotateY(degrees, origin = Vector.ZERO) {
        if (degrees === 0)
            return this.clone;
        const x = this.x - origin.x;
        const z = this.z - origin.z;
        const radians = degrees * Math.PI / 180;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        this.x = Math.round(Vector.EPSILON * (cos * x - sin * z)) / Vector.EPSILON + origin.x;
        this.z = Math.round(Vector.EPSILON * (sin * x + cos * z)) / Vector.EPSILON + origin.z;
        return this;
    }
    rotateZ(degrees, origin = Vector.ZERO) {
        if (degrees === 0)
            return this.clone;
        const x = this.x - origin.x;
        const y = this.y - origin.y;
        const radians = degrees * Math.PI / 180;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        this.x = Math.round(Vector.EPSILON * (cos * x - sin * y)) / Vector.EPSILON + origin.x;
        this.y = Math.round(Vector.EPSILON * (sin * x + cos * y)) / Vector.EPSILON + origin.y;
        return this;
    }
    min(other) {
        return new Vector(Math.min(this.x, other.x), Math.min(this.y, other.y), Math.min(this.z, other.z));
    }
    max(other) {
        return new Vector(Math.max(this.x, other.x), Math.max(this.y, other.y), Math.max(this.z, other.z));
    }
    floor() {
        this.x = Math.floor(this.x),
            this.y = Math.floor(this.y),
            this.z = Math.floor(this.z);
    }
    ceil() {
        this.x = Math.ceil(this.x),
            this.y = Math.ceil(this.y),
            this.z = Math.ceil(this.z);
    }
    round() {
        this.x = Math.round(this.x),
            this.y = Math.round(this.y),
            this.z = Math.round(this.z);
    }
    abs() {
        this.x = Math.abs(this.x),
            this.y = Math.abs(this.y),
            this.z = Math.abs(this.z);
    }
    lerp(other, t) {
        return new Vector((1 - t) * this.x + t * other.x, (1 - t) * this.y + t * other.y, (1 - t) * this.z + t * other.z);
    }
    toString() {
        return `{ ${this.x}, ${this.y}, ${this.z} }`;
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
}
Vector.EPSILON = 1000000;
class Camera {
    constructor() {
        this.location = Vector.ZERO;
        this.rotation = Vector.ZERO;
        this.fov = 150;
    }
    getRotation() {
        return this.rotation.clone;
    }
    getViewVector() {
        return new Vector(0, 0, 1)
            .rotateX(this.rotation.x)
            .rotateY(this.rotation.y);
    }
    getDirectionLength(plane = 1) {
        return plane / Math.tan(this.fov * Math.PI / 360);
    }
    getDirection() {
        const length = this.getDirectionLength();
        const direction = new Vector(0, 0, length)
            .rotateX(this.rotation.x)
            .rotateY(this.rotation.y);
        return direction;
    }
    setRotationX(value) {
        this.rotation.x = Math.max(-90, Math.min(90, value));
    }
    setRotationY(value) {
        this.rotation.y = -Math.floor(value / 360) * 360 + value;
    }
    render(shape) {
        shape = shape.clone;
        shape.rotateY(-this.rotation.y, this.location);
        shape.rotateX(-this.rotation.x, this.location);
        beginShape();
        const points = [];
        const luminance = Math.max(0, shape.getSurface().dot(this.location.fromOrigin(shape.location).normalized));
        if (luminance > 0) {
            fill(color(255, 0, 0));
        }
        else {
            fill("#000000");
        }
        let counter = 0;
        for (const point of shape.getVertices()) {
            const length = this.getDirectionLength(windowWidth);
            const location = shape.location.clone.add(point).fromOrigin(this.location);
            if (Math.sign(location.z) === -1)
                counter++;
            if (location.z === 0)
                return;
            const ooz = 1 / location.z;
            const pointX = windowWidth / 2 + (location.x * length) * ooz;
            const pointY = windowHeight / 2 + (location.y * length) * ooz;
            points.push([pointX, pointY]);
        }
        if (shape.getVertices().length === counter)
            return;
        for (const point of points) {
            vertex(point[0], point[1]);
        }
        endShape(CLOSE);
    }
}
class Shape {
    constructor() {
        this.location = Vector.ZERO;
        this.vertices = [];
    }
    move(vector) {
        this.location.add(vector);
    }
    getVertices() {
        return this.vertices;
    }
    rotateX(degrees, origin) {
        for (const vertex of this.vertices) {
            vertex.add(this.location).rotateX(degrees, origin);
        }
        this.location.rotateX(degrees, origin);
        for (const vertex of this.vertices) {
            vertex.sub(this.location);
        }
    }
    rotateY(degrees, origin) {
        for (const vertex of this.vertices) {
            vertex.add(this.location).rotateY(degrees, origin);
        }
        this.location.rotateY(degrees, origin);
        for (const vertex of this.vertices) {
            vertex.sub(this.location);
        }
    }
    rotateZ(degrees, origin) {
        for (const vertex of this.vertices) {
            vertex.add(this.location).rotateZ(degrees, origin);
        }
        this.location.rotateZ(degrees, origin);
        for (const vertex of this.vertices) {
            vertex.sub(this.location);
        }
    }
}
class Rect extends Shape {
    constructor(location = Vector.ZERO, scale = 1) {
        super();
        this.vertices.push(new Vector(-scale, -scale, 0), new Vector(-scale, scale, 0), new Vector(scale, scale, 0), new Vector(scale, -scale, 0));
        this.location.x = location.x;
        this.location.y = location.y;
        this.location.z = location.z;
    }
    getSurface() {
        return this.vertices[0].cross(this.vertices[1]).normalized;
    }
    scale(x, y) {
        for (const vertex of this.vertices) {
            vertex.x = Math.sign(vertex.x) * x;
            vertex.y = Math.sign(vertex.y) * y;
        }
        return this;
    }
    get clone() {
        const rect = new Rect(this.location);
        this.vertices.forEach((vertex, index) => {
            rect.vertices[index].x = vertex.x;
            rect.vertices[index].y = vertex.y;
            rect.vertices[index].z = vertex.z;
        });
        return rect;
    }
}
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["W"] = 87] = "W";
    KeyCode[KeyCode["A"] = 65] = "A";
    KeyCode[KeyCode["S"] = 83] = "S";
    KeyCode[KeyCode["D"] = 68] = "D";
    KeyCode[KeyCode["SPACE_BAR"] = 32] = "SPACE_BAR";
    KeyCode[KeyCode["L_SHIFT"] = 16] = "L_SHIFT";
    KeyCode[KeyCode["ARROW_LEFT"] = 37] = "ARROW_LEFT";
    KeyCode[KeyCode["ARROW_TOP"] = 38] = "ARROW_TOP";
    KeyCode[KeyCode["ARROW_RIGHT"] = 39] = "ARROW_RIGHT";
    KeyCode[KeyCode["ARROW_BOTTOM"] = 40] = "ARROW_BOTTOM";
})(KeyCode || (KeyCode = {}));
const framePerSecond = 60;
const rectShape1 = new Rect();
const rectShape2 = new Rect();
rectShape1.location.add(new Vector(0, 0, 5));
rectShape1.scale(1, 1);
rectShape1.rotateY(0);
rectShape2.location.add(new Vector(3, 0, 5));
const cam = new Camera();
function setup() {
    console.log("🚀 - Setup initialized - P5 is running_");
    createCanvas(windowWidth, windowHeight);
    frameRate(framePerSecond);
}
const vec = new Vector(0, 100, 0);
let i = 0;
function draw() {
    background("#000000");
    const deltaConstant = deltaTime / (1000 / framePerSecond);
    const speed = 3 * deltaConstant / framePerSecond;
    if (keyIsDown(KeyCode.W)) {
        cam.location.add(new Vector(0, 0, speed).rotateY(cam.getRotation().y));
    }
    if (keyIsDown(KeyCode.A)) {
        cam.location.add(new Vector(-speed, 0, 0).rotateY(cam.getRotation().y));
    }
    if (keyIsDown(KeyCode.S)) {
        cam.location.add(new Vector(0, 0, -speed).rotateY(cam.getRotation().y));
    }
    if (keyIsDown(KeyCode.D)) {
        cam.location.add(new Vector(speed, 0, 0).rotateY(cam.getRotation().y));
    }
    if (keyIsDown(KeyCode.SPACE_BAR)) {
        cam.location.add(new Vector(0, -speed, 0));
    }
    if (keyIsDown(KeyCode.L_SHIFT)) {
        cam.location.add(new Vector(0, speed, 0));
    }
    if (keyIsDown(KeyCode.ARROW_RIGHT))
        rectShape1.rotateY(1, rectShape1.location);
    if (keyIsDown(KeyCode.ARROW_LEFT))
        rectShape1.rotateY(-1, rectShape1.location);
    cam.setRotationY(-360 * mouseX / windowWidth + 180);
    cam.setRotationX(-180 * mouseY / windowHeight + 90);
    cam.render(rectShape1);
}
function keyPressed() {
    console.log(keyCode);
}
//# sourceMappingURL=build.js.map