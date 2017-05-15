class Storage extends Box {
    constructor (options) {
        super(options);
        delete this.stored;
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

    getAvailableAreas () {
        this.areas = [];
        this.boxes.forEach((box) => {
            // generate areas
        });

        // show areas
        this.areas.forEach((area) => {

        });
        return this.areas;
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
        for (var i = 0; i < count; i++) {
            this.boxes.push(this.generateBox());
        }
    }
}
