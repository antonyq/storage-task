class Storage extends Box {
    constructor (sizeObj, volume, boxCount) {
        super(sizeObj, {x:1, y:1, z:1}, volume);
        this.boxes = [];
        this.generateBoxes(boxCount);
    }

    getStoredVolume () {
        var boxVolumes = this.boxes.map((elem) => (elem.stored) ? (elem.volume || 0) : 0);
        return boxVolumes.reduce((prev, curr) => prev + curr, 0);
    }

    getAvailableVolume () {
        return this.volume - this.getStoredVolume();
    }

    generateBox () {
        var newBox = new Box ({
            h: Math.random() * 10,
            w: Math.random() * 10,
            d: Math.random() * 10,
        }, {
            x: Math.random() * 10,
            y: Math.random() * 10,
            z: Math.random() * 10,
        }, 10);
        newBox.stored = false;
        return newBox;
    }

    generateBoxes (number = 2) { // crutch
        for (var i = 0; i < number; i++) {
            this.boxes.push(this.generateBox());
        }
    }

    iterateBoxes (callback) {
        if (typeof callback == "function") {
            for (var box in this.boxes) {
                callback(this.boxes[box], parseInt(box));
            }
        }
    }
}
