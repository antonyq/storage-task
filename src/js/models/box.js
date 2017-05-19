class Box {
    // change pivot point from center to start

    constructor (options) {
        this.scene = options.scene;
        this.model = BABYLON.Mesh.CreateBox("box", 1, options.scene, false, BABYLON.Mesh.DEFAULTSIDE);

        this.model.position = new BABYLON.Vector3(options.x, options.y, options.z);
        this.model.scaling = new BABYLON.Vector3(options.w, options.h, options.d);

        this.model.showBoundingBox = options.showBoundingBox;

        var materialBox = new BABYLON.StandardMaterial("texture", options.scene);
        if (options.texture) {
            materialBox.diffuseTexture = new BABYLON.Texture("../../img/textures/" + options.texture, options.scene);
            materialBox.diffuseTexture.hasAlpha = true;
        } else {
            materialBox.diffuseColor = new BABYLON.Color3(options.R, options.G, options.B);
            materialBox.alpha = options.A;
            materialBox.wireframe = true;
        }
        this.model.material = materialBox;


        this.stored = false;
        this.volume = options.w * options.h * options.d;

        // generate angles
        [
            [-1,-1,-1],
            [ 1,-1,-1], [-1, 1,-1], [-1,-1, 1],
            [ 1, 1,-1], [-1, 1, 1], [ 1,-1, 1],
            [ 1, 1, 1]
        ].forEach((angleMatrix, index) => {
            if (index) {
                this.angles.push(new Angle ({
                    scene: this.scene,
                    x: this.model.position.x + angleMatrix * this.model.scaling.x / 2,
                    y: this.model.position.y + angleMatrix * this.model.scaling.y / 2,
                    z: this.model.position.z + angleMatrix * this.model.scaling.z / 2,
                    w: 0.1,
                    h: 0.1,
                    d: 0.1
                }));
            } else {
                this.angles = [];
            }
        });

        this.angles = [
            new Angle ({
                scene: this.scene,
                x: this.model.position.x - this.model.scaling.x / 2,
                y: this.model.position.y - this.model.scaling.y / 2,
                z: this.model.position.z - this.model.scaling.z / 2,
                w: 0.1,
                h: 0.1,
                d: 0.1
            }), new Angle ({
                scene: this.scene,
                x: this.model.position.x + this.model.scaling.x / 2,
                y: this.model.position.y - this.model.scaling.y / 2,
                z: this.model.position.z - this.model.scaling.z / 2,
                w: 0.1,
                h: 0.1,
                d: 0.1
            }), new Angle ({
                scene: this.scene,
                x: this.model.position.x - this.model.scaling.x / 2,
                y: this.model.position.y + this.model.scaling.y / 2,
                z: this.model.position.z - this.model.scaling.z / 2,
                w: 0.1,
                h: 0.1,
                d: 0.1
            }), new Angle ({
                scene: this.scene,
                x: this.model.position.x - this.model.scaling.x / 2,
                y: this.model.position.y - this.model.scaling.y / 2,
                z: this.model.position.z + this.model.scaling.z / 2,
                w: 0.1,
                h: 0.1,
                d: 0.1
            }), new Angle ({
                scene: this.scene,
                x: this.model.position.x + this.model.scaling.x / 2,
                y: this.model.position.y + this.model.scaling.y / 2,
                z: this.model.position.z - this.model.scaling.z / 2,
                w: 0.1,
                h: 0.1,
                d: 0.1
            }), new Angle ({
                scene: this.scene,
                x: this.model.position.x - this.model.scaling.x / 2,
                y: this.model.position.y + this.model.scaling.y / 2,
                z: this.model.position.z + this.model.scaling.z / 2,
                w: 0.1,
                h: 0.1,
                d: 0.1
            }), new Angle ({
                scene: this.scene,
                x: this.model.position.x + this.model.scaling.x / 2,
                y: this.model.position.y - this.model.scaling.y / 2,
                z: this.model.position.z + this.model.scaling.z / 2,
                w: 0.1,
                h: 0.1,
                d: 0.1
            }), new Angle ({
                scene: this.scene,
                x: this.model.position.x + this.model.scaling.x / 2,
                y: this.model.position.y + this.model.scaling.y / 2,
                z: this.model.position.z + this.model.scaling.z / 2,
                w: 0.1,
                h: 0.1,
                d: 0.1
            })
        ];
    }

    move (targetPoint, delta) {
        delta = delta || 1;

        for (var axis in targetPoint) {
            var diff = this.angles[0].model.position[axis] - targetPoint[axis];
            this.model.position[axis] -= delta * diff;
            for (var i in this.angles) {
                this.angles[i].model.position[axis] -= delta * diff;
            }

        }
    }
}
