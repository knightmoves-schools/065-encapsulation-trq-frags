class Rectangle {
    constructor(length, height) {
        this.length = length;
        this.height = height;
    }

    calculateArea() {
        return this.length * this.height;
    }
}

const length = 5;
const height = 10;

const rect = new Rectangle(length, height);

console.log(rect.calculateArea());