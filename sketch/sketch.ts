interface Vector3 {
    x: number;
    y: number;
    z: number;
}
class Vector {
    private values: [ number, number, number ];

    public constructor(
        x: number,
        y: number,
        z: number,
    ) {
        this.values = [ x, y, z ];
    }

    public static get ZERO() {
        return new Vector(0, 0, 0);
    }
    public static EPSILON = 1000000;

    public static from(vector: Vector3) {
        return new Vector(vector.x, vector.y, vector.z);
    }

    public get x() {
        return this.values[0];
    }
    public get y() {
        return this.values[1];
    }
    public get z() {
        return this.values[2];
    }
    public set x(value: number) {
        this.values[0] = value;
    }
    public set y(value: number) {
        this.values[1] = value;
    }
    public set z(value: number) {
        this.values[2] = value;
    }

    public get(index: 0 | 1 | 2) {
        return this.values[index];
    }
    public set(index: 0 | 1 | 2, value: number) {
        this.values[index] = value;
    }

    public equals(other: Vector3) {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }

    public fromOrigin(origin: Vector3) {
        return new Vector(
            this.x - origin.x,
            this.y - origin.y,
            this.z - origin.z,
        )
    }

    public get lengthSquared(): number {
        return this.x ** 2 + this.y ** 2 + this.z ** 2;
    }

    public get length(): number {
        return this.lengthSquared ** 0.5;
    }

    public set length(value: number) {
        const length = this.length;

        this.x *= value / length;
        this.y *= value / length;
        this.z *= value / length;
    }

    public get clone() {
        return Vector.from(this);
    }

    public get normalized() {
        const clone = this.clone;
        clone.length = 1;

        return clone;
    }

    public add(value: number | Vector3) {
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

    public sub(value: number | Vector3) {
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

    public multiply(value: number | Vector3) {
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

    public divide(value: number | Vector3) {
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

    public dot(vector: Vector3) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
    }

    public cross(vector: Vector3) {
        return new Vector(
            this.y * vector.z - this.z * vector.y,
            this.x * vector.z - this.z * vector.x,
            this.x * vector.y - this.y * vector.x,
        )
    }

    public rotateX(degrees: number, origin: Vector3 = Vector.ZERO) {
        if (degrees === 0) return this.clone;

        const y = this.y - origin.y;
        const z = this.z - origin.z;
        const radians = degrees * Math.PI / 180;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        
        this.y = Math.round(Vector.EPSILON * (cos * y - sin * z)) / Vector.EPSILON + origin.y;
        this.z = Math.round(Vector.EPSILON * (sin * y + cos * z)) / Vector.EPSILON + origin.z;

        return this;
    }

    public rotateY(degrees: number, origin: Vector3 = Vector.ZERO) {
        if (degrees === 0) return this.clone;

        const x = this.x - origin.x;
        const z = this.z - origin.z;
        const radians = degrees * Math.PI / 180;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        this.x = Math.round(Vector.EPSILON * (cos * x - sin * z)) / Vector.EPSILON + origin.x;
        this.z = Math.round(Vector.EPSILON * (sin * x + cos * z)) / Vector.EPSILON + origin.z;

        return this;
    }

    public rotateZ(degrees: number, origin: Vector3 = Vector.ZERO) {
        if (degrees === 0) return this.clone;

        const x = this.x - origin.x;
        const y = this.y - origin.y;
        const radians = degrees * Math.PI / 180;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        this.x = Math.round(Vector.EPSILON * (cos * x - sin * y)) / Vector.EPSILON + origin.x;
        this.y = Math.round(Vector.EPSILON * (sin * x + cos * y)) / Vector.EPSILON + origin.y;

        return this;
    }

    public min(other: Vector3) {
        return new Vector(
            Math.min(this.x, other.x),
            Math.min(this.y, other.y),
            Math.min(this.z, other.z)
        )
    }

    public max(other: Vector3) {
        return new Vector(
            Math.max(this.x, other.x),
            Math.max(this.y, other.y),
            Math.max(this.z, other.z)
        )
    }

    public floor() {
        this.x = Math.floor(this.x),
        this.y = Math.floor(this.y),
        this.z = Math.floor(this.z)
    }

    public ceil() {
        this.x = Math.ceil(this.x),
        this.y = Math.ceil(this.y),
        this.z = Math.ceil(this.z)
    }

    public round() {
        this.x = Math.round(this.x),
        this.y = Math.round(this.y),
        this.z = Math.round(this.z)
    }

    public abs() {
        this.x = Math.abs(this.x),
        this.y = Math.abs(this.y),
        this.z = Math.abs(this.z)
    }

    public lerp(other: Vector3, t: number) {
        return new Vector(
            (1 - t) * this.x + t * other.x,
            (1 - t) * this.y + t * other.y,
            (1 - t) * this.z + t * other.z,
        )
    }

    public toString() {
        return `{ ${this.x}, ${this.y}, ${this.z} }`;
    }

    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
        yield this.z;
    }
}
class Camera {
    public location: Vector = Vector.ZERO;
    private rotation: Vector = Vector.ZERO;
    public fov: number = 100;

    public getRotation() {
        return this.rotation.clone;
    }
    public getViewVector() {
        return new Vector(
            0,
            0,
            1
        )
            .rotateX(this.rotation.x)
            .rotateY(this.rotation.y);

        
    }
    public getDirectionLength(plane: number = 1) {
        return plane / Math.tan(this.fov * Math.PI / 360) / 2;
    }
    public getDirection() {
        const length = this.getDirectionLength();

        const direction = new Vector(
            0,
            0,
            length
        )
            .rotateX(this.rotation.x)
            .rotateY(this.rotation.y);

        return direction;
    }

    public setRotationX(value: number) {
        this.rotation.x = Math.max(-90, Math.min(90, value));
    }
    public setRotationY(value: number) {
        this.rotation.y = -Math.floor(value / 360) * 360 + value;
    }

    public render(shape: Shape) {
        shape = shape.clone;

        shape.rotateY(-this.rotation.y, this.location);
        shape.rotateX(-this.rotation.x, this.location);

        beginShape();
        
        const length = this.getDirectionLength(windowWidth);
        const points: [ number, number ][] = [];
        const luminance = Math.max(0, shape.getSurface().dot(this.location.fromOrigin(shape.location).normalized));

        // if (luminance > 0) {
        //     fill(color(255, 0, 0))
        // }
        // else {
        //     fill("#000000");
        // }
        // fill(color(255 * luminance, 255 * luminance, 255 * luminance))
        const vertices = shape.getVertices();
        for (let i = 0; i < vertices.length - 1; i++) {
            const current = shape.location.clone.add(vertices[i]).fromOrigin(this.location);
            const next = shape.location.clone.add(vertices[i + 1]).fromOrigin(this.location);

            const cameraLocation = new Vector(0, 0, 0)
            const fovLines = [
                new Vector(-Math.sin(this.fov * Math.PI / 360), Math.cos(this.fov * Math.PI / 360), 0),
                new Vector(Math.sin(this.fov * Math.PI / 360), Math.cos(this.fov * Math.PI / 360), 0),
                new Vector( -windowHeight / 2, length, 0 ),
                new Vector( windowHeight / 2, length, 0 ),
            ]
            const currentLocation = new Vector(current.x, current.z, 0);
            const nextLocation = new Vector(next.x, next.z, 0);
            const currentLocationY = new Vector(current.y, current.z, 0);
            const nextLocationY = new Vector(next.y, next.z, 0);

            const left = ccw(cameraLocation, fovLines[0], currentLocation) * ccw(cameraLocation, fovLines[0], nextLocation) <= 0;
            const right = ccw(cameraLocation, fovLines[1], currentLocation) * ccw(cameraLocation, fovLines[1], nextLocation) <= 0;
            const top = ccw(cameraLocation, fovLines[2], currentLocationY) * ccw(cameraLocation, fovLines[2], nextLocationY) <= 0;
            const bottom = ccw(cameraLocation, fovLines[3], currentLocationY) * ccw(cameraLocation, fovLines[3], nextLocationY) <= 0;

            if (left) console.log("왼쪽 화면에 걸림");
            if (right) console.log("오른쪽 화면에 걸림");
            if (top) console.log("화면 상단에 걸림");
            if (bottom) console.log("화면 하단에 걸림");
            
        }
        // console.log("\n\n")

        for (const point of shape.getVertices()) {
            const location = shape.location.clone.add(point).fromOrigin(this.location);
            if (location.z === 0) return;
            const ooz = 1 / location.z;
            const pointX = windowWidth / 2 + (location.x * length) * ooz;
            const pointY = windowHeight / 2 + (location.y * length) * ooz;
            // console.log(location.x.toFixed(2), location.y.toFixed(2), location.z.toFixed(2));
            // console.log(pointX, pointY);
            
            points.push([ pointX, pointY ]);
        }

        
        if (points.every(point => point[0] < 0 || point[1] < 0 || point[0] >= windowWidth || point[1] >= windowHeight)) return;
        
        for (const point of points) {
            vertex(point[0], point[1]);
        }
        
        // console.log("drawing\n\n")
        endShape(CLOSE);
    }
}
abstract class Shape {
    public location: Vector = Vector.ZERO;
    protected vertices: Vector[] = [];

    public abstract getSurface(): Vector;
    public abstract scale(...values: number[]): Shape;
    public abstract get clone(): Shape;

    public move(vector: Vector) {
        this.location.add(vector);
    }
    public getVertices() {
        return this.vertices;
    }
    public rotateX(degrees: number, origin?: Vector3) {
        for (const vertex of this.vertices) {
            vertex.add(this.location).rotateX(degrees, origin);
        }
        this.location.rotateX(degrees, origin);
        for (const vertex of this.vertices) {
            vertex.sub(this.location);
        }
    }
    public rotateY(degrees: number, origin?: Vector3) {
        for (const vertex of this.vertices) {
            vertex.add(this.location).rotateY(degrees, origin);
        }
        this.location.rotateY(degrees, origin);
        for (const vertex of this.vertices) {
            vertex.sub(this.location);
        }
    }
    public rotateZ(degrees: number, origin?: Vector3) {
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
    constructor(location: Vector = Vector.ZERO, scale: number = 1) {
        super();
        this.vertices.push(
            new Vector(-scale, -scale, 0),
            new Vector(-scale, scale, 0),
            new Vector(scale, scale, 0),
            new Vector(scale, -scale, 0),
        )
        this.location.x = location.x;
        this.location.y = location.y;
        this.location.z = location.z;
    }

    public getSurface() {
        return this.vertices[0].cross(this.vertices[1]).normalized;
    }
    public scale(x: number, y: number) {
        for (const vertex of this.vertices) {
            vertex.x = Math.sign(vertex.x) * x;
            vertex.y = Math.sign(vertex.y) * y;
        }

        return this;
    }
    public get clone() {
        const rect = new Rect(this.location);
        this.vertices.forEach((vertex, index) => {
            rect.vertices[index].x = vertex.x;
            rect.vertices[index].y = vertex.y;
            rect.vertices[index].z = vertex.z;
        });
        return rect;
    }

}

enum KeyCode {
    W = 87,
    A = 65,
    S = 83,
    D = 68,
    SPACE_BAR = 32,
    L_SHIFT = 16,

    ARROW_LEFT = 37,
    ARROW_TOP,
    ARROW_RIGHT,
    ARROW_BOTTOM,
}

const ccw = (a: Vector, b: Vector, c: Vector): number => {
    return Math.sign((b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y));
}

const isCrossing = (a: Vector, b: Vector, c: Vector, d: Vector): boolean => {
    const state1 = ccw(a, c, d) * ccw(b, c, d);
    const state2 = ccw(c, a, b) * ccw(d, a, b);

    if (state1 === 0 && state2 === 0) {
        const aMin = a.min(b);
        const bMax = a.max(b);
        const cMin = c.min(d);
        const dMax = c.max(d);

        return (bMax.lengthSquared >= cMin.lengthSquared && dMax.lengthSquared >= aMin.lengthSquared)
    }
    else return (state1 <= 0 && state2 <= 0);
}

const framePerSecond = 60;
const rectShape1 = new Rect();
const rectShape2 = new Rect();
rectShape1.location.add(new Vector( 0, 0, 5 ));
rectShape1.scale(1, 1);
rectShape1.rotateY(0);
rectShape2.location.add(new Vector( 3, 0, 5 ));
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
        cam.location.add(new Vector( 0, 0, speed ).rotateY(cam.getRotation().y));
    }
    if (keyIsDown(KeyCode.A)) {
        cam.location.add(new Vector( -speed, 0, 0 ).rotateY(cam.getRotation().y));
    }
    if (keyIsDown(KeyCode.S)) {
        cam.location.add(new Vector( 0, 0, -speed ).rotateY(cam.getRotation().y));
    }
    if (keyIsDown(KeyCode.D)) {
        cam.location.add(new Vector( speed, 0, 0 ).rotateY(cam.getRotation().y));
    }
    if (keyIsDown(KeyCode.SPACE_BAR)) {
        cam.location.add(new Vector( 0, -speed, 0  ));
    }
    if (keyIsDown(KeyCode.L_SHIFT)) {
        cam.location.add(new Vector( 0, speed, 0 ));
    }

    if (keyIsDown(KeyCode.ARROW_RIGHT)) rectShape1.rotateY(1, rectShape1.location);
    if (keyIsDown(KeyCode.ARROW_LEFT)) rectShape1.rotateY(-1, rectShape1.location);

    cam.setRotationY(-360 * mouseX / windowWidth + 180);
    cam.setRotationX(-180 * mouseY / windowHeight + 90);

    cam.render(rectShape1);
    cam.render(rectShape2);
}

function keyPressed() {
    console.log(keyCode);
}