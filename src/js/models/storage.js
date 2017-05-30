class Storage extends Box {
    constructor (options) {
        super(options);
        this.boxes = [];
        this.scene = options.scene;
        this.generateBoxes(options.boxCount);
    }

    // get stored volume in 0.X format
    getStoredVolume () {
        var boxVolumes = this.boxes.map((box) => (box.stored) ? box.volume : 0);
        return boxVolumes.reduce((prev, curr) => prev + curr, 0) / this.volume;
    }

    // get available volume 0.X format
    getAvailableVolume () {
        return 1 - this.getStoredVolume();
    }

    getStoredBoxesCount () {
        var counter = 0;
        this.boxes.forEach((box) => {
            if (box.stored) counter++;
        });
        return counter;
    }

    getNextPoint () {
        for (var [index, box] of this.boxes.entries()) {
            if (! box.stored) {
                let xMostPoint = index ? this.boxes[index-1].angles[1].model.position : this.angles[0].model.position,
                    yMostPoint = this.getLastDirectiveYBox().angles[2].model.position,
                    zMostPoint = this.getLastDirectiveXBox().angles[3].model.position;

                if (box.isPlacedInPoint(xMostPoint, this)) {
                    return xMostPoint;
                } else if (box.isPlacedInPoint(zMostPoint, this)) {
                    box.directiveX = false;
                    return zMostPoint;
                } else if (box.isPlacedInPoint(yMostPoint, this)) {
                    box.directiveX = false;
                    box.directiveY = false;
                    return yMostPoint;
                }
            };
        }
    }

    getLastDirectiveXBox () {
        var directiveXBoxes = this.boxes.filter((box) => box.directiveX);
        return directiveXBoxes[directiveXBoxes.length-1];
    }

    getLastDirectiveYBox () {
        var directiveYBoxes = this.boxes.filter((box) => box.directiveY);
        return directiveYBoxes[directiveYBoxes.length-1];
    }

    // getMostActualBox (point) {
    // if (moreActual exists) swap
    // }

    generateBox (options) {
        return new Box ({
            x: options ? options.x : 0.5 * Math.random() * this.model.position.x,
            y: options ? options.y : 0.5 * Math.random() * this.model.position.y,
            z: options ? options.z : 0.5 * Math.random() * this.model.position.z,
            h: options ? options.h : 0.5 * Math.random() * this.model.scaling.x,
            w: options ? options.w : 0.5 * Math.random() * this.model.scaling.y,
            d: options ? options.d : 0.5 * Math.random() * this.model.scaling.z,
            texture: "metal/3.jpg",
            scene: this.scene
        });
    }

    generateBoxes (count) {
        var boxes = [];
        for (var i = 0; i < count; i++) {
            boxes.push(this.generateBox(/*{x:0, y:15, z:0, h:6, w:6, d:6}*/));
        }
        this.boxes = boxes.sort((a, b) => (a.volume < b. volume) ? 1 : -1);
    }
}
