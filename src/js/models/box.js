function Box (windowWidth, windowHeight) {
    this.position = {
        x: windowWidth * Math.random(),
        y : windowHeight * Math.random(),
        z: 10 * Math.random()
    };

    this.size = {
        height: 10,
        width: 10,
        depth: 10
    };

    this.anglePoints = [
        this.position, {
            x: this.position.x + this.size.width,
            y: this.position.y,
            z: this.position.z
        }, {
            x: this.position.x,
            y: this.position.y + this.size.height,
            z: this.position.z
        }, {
            x: this.position.x,
            y: this.position.y,
            z: this.position.z + this.size.depth
        }, {
            x: this.position.x + this.size.width,
            y: this.position.y + this.size.height,
            z: this.position.z
        }, {
            x: this.position.x,
            y: this.position.y + this.size.height,
            z: this.position.z + this.size.depth
        }, {
            x: this.position.x + this.size.width,
            y: this.position.y,
            z: this.position.z + this.size.depth
        }, {
            x: this.position.x + this.size.width,
            y: this.position.y + this.size.height,
            z: this.position.z + this.size.depth
        }
    ];

    this.isPointIn = function (point) {

    };

    this.intersects = function (box) {
        return box.anglePoints.some(this.isPointIn);
    };
}