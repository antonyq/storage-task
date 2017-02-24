function Area (sizeObj, positionObj) {
    this.size = sizeObj;
    this.position = positionObj;

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
}

Area.prototype.isBoxPlaced = function (box) {

}
