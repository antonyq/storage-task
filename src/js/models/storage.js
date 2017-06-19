class Storage extends Box {
    constructor (options) {
        super(options);
        this.boxes = [];
        this.corners = [];
        this.scene = options.scene;
        this.generateBoxes(options.boxCount);
    }


    getStoredVolume () {
        let boxVolumes = this.boxes.map((box) => (box.stored) ? box.volume : 0);
        return boxVolumes.reduce((prev, curr) => prev + curr, 0) / this.volume;
    }

    getAvailableVolume () {
        return 1 - this.getStoredVolume();
    }

    getStoredBoxes () {
        return this.boxes.filter(box => box.stored);
    }

    getNotStoredBoxes () {
        return this.boxes.filter(box => !box.stored);
    }

    getStoredBoxesCount () {
        return this.getStoredBoxes().length;
    }

    getMostPoint (axis) {
        let axisAngleMap = {'x': 1, 'y': 2, 'z': 3},
            mostPoint = this.angles[0].model.position,
            storedBoxes = this.boxes.filter(box => box.stored);

        storedBoxes.forEach((box) => {
            if (box.angles[axisAngleMap[axis]].model.position[axis] > mostPoint[axis]) {
                mostPoint = box.angles[axisAngleMap[axis]].model.position;
            }
        });

        return mostPoint;
    }

    getNextPoint () {
        for (let [index, box] of this.boxes.entries()) {
            if (! box.stored) {
                let xMostPoint = this.getMostPoint('x'), //index ? this.boxes[index-1].angles[1].model.position : this.angles[0].model.position
                    yMostPoint = this.getMostPoint('y'), //this.getLastDirectiveYBox().angles[2].model.position
                    zMostPoint = this.getMostPoint('z'); //this.getLastDirectiveXBox().angles[3].model.position

                if (box.placedInPoint(xMostPoint, this)) {
                    return xMostPoint;
                } else if (box.placedInPoint(zMostPoint, this)) {
                    box.directiveX = false;
                    return zMostPoint;
                } else if (box.placedInPoint(yMostPoint, this)) {
                    box.directiveX = false;
                    box.directiveY = false;
                    return yMostPoint;
                }
            };
        }
    }

    getNextPoints () {

    }

    getLastDirectiveXBox () {
        let directiveXBoxes = this.boxes.filter((box) => box.directiveX);
        return directiveXBoxes[directiveXBoxes.length-1];
    }

    getLastDirectiveYBox () {
        let directiveYBoxes = this.boxes.filter((box) => box.directiveY);
        return directiveYBoxes[directiveYBoxes.length-1];
    }

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
        for (let i = 0; i < count; i++) {
            this.boxes.push(this.generateBox(/*{x:0, y:15, z:0, h:6, w:6, d:6}*/));
        }

        this.boxes = this.boxes.sort((a, b) => (a.volume < b. volume) ? 1 : -1);
    }
}
