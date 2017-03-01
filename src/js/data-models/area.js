class Area {
    constructor(sizeObj, positionObj) {
        this.size = sizeObj;
        this.position = positionObj;

        this.anglePoints = [
            this.position, {
                x: this.position.x + this.size.w,
                y: this.position.y,
                z: this.position.z
            }, {
                x: this.position.x,
                y: this.position.y + this.size.h,
                z: this.position.z
            }, {
                x: this.position.x,
                y: this.position.y,
                z: this.position.z + this.size.d
            }, {
                x: this.position.x + this.size.w,
                y: this.position.y + this.size.h,
                z: this.position.z
            }, {
                x: this.position.x,
                y: this.position.y + this.size.h,
                z: this.position.z + this.size.d
            }, {
                x: this.position.x + this.size.w,
                y: this.position.y,
                z: this.position.z + this.size.d
            }, {
                x: this.position.x + this.size.w,
                y: this.position.y + this.size.h,
                z: this.position.z + this.size.d
            }
        ];
    }

    isBoxPlaced (box) {

    }
}
