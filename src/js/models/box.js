class Box {
    // change pivot point from center to start

    constructor (options) {
        this.scene = options.scene;
        this.model = BABYLON.Mesh.CreateBox("box", 1, options.scene, false, BABYLON.Mesh.DEFAULTSIDE);

        this.model.position = new BABYLON.Vector3(options.x, options.y, options.z);
        this.model.scaling = new BABYLON.Vector3(options.w, options.h, options.d);

        let materialBox = new BABYLON.StandardMaterial("texture", options.scene);
        if (options.texture) {
            materialBox.diffuseTexture = new BABYLON.Texture("../../img/textures/" + options.texture, options.scene);
            materialBox.diffuseTexture.hasAlpha = true;
        } else {
            materialBox.diffuseColor = new BABYLON.Color3(options.R, options.G, options.B);
            materialBox.alpha = options.A;
            materialBox.wireframe = true;
        }
        this.model.material = materialBox;


        this.angles = [];
        this.stored = false;
        this.volume = options.w * options.h * options.d;

        // generate angles
        [
            [-1,-1,-1],
            [ 1,-1,-1],
            [-1, 1,-1],
            [-1,-1, 1],
            [ 1, 1,-1],
            [ 1,-1, 1],
            [-1, 1, 1],
            [ 1, 1, 1]
        ].forEach((angleVector) => {
            this.angles.push(new Angle ({
                scene: this.scene,
                x: this.model.position.x + angleVector[0] * this.model.scaling.x / 2,
                y: this.model.position.y + angleVector[1] * this.model.scaling.y / 2,
                z: this.model.position.z + angleVector[2] * this.model.scaling.z / 2,
                w: 0.1,
                h: 0.1,
                d: 0.1
            }));
        });

    }

    move (targetPoint, delta=1) {
        for (let axis in targetPoint) {
            let diff = this.angles[0].model.position[axis] - targetPoint[axis];
            this.model.position[axis] -= delta * diff;
            for (let i in this.angles) {
                this.angles[i].model.position[axis] -= delta * diff;
            }

        }
    }

    inPoint (point, eps=0.001) {
        return Math.sqrt(
               (this.angles[0].model.position.x - point.x)**2 +
               (this.angles[0].model.position.y - point.y)**2 +
               (this.angles[0].model.position.z - point.z)**2
           ) < eps;
    }

    placedInPoint (point, storage) {
        return point.x + this.model.scaling.x < storage.angles[1].model.position.x &&
               point.y + this.model.scaling.y < storage.angles[2].model.position.y &&
               point.z + this.model.scaling.z < storage.angles[3].model.position.z;
    }

    intersects (box, eps=0.001) {
        let boundaryPoints = [box.angles[0].model.position, box.angles[7].model.position],
            intersects = {};

        ['x', 'y', 'z'].forEach((axis) => {
            let surfacePairs = [
                [-Infinity, boundaryPoints[0][axis] - eps],
                [boundaryPoints[0][axis] + eps, boundaryPoints[1][axis] - eps],
                [boundaryPoints[1][axis] + eps, Infinity]
            ];

             this.angles.forEach((angle) => {
                surfacePairs.every((surfacePair, index) => {
                    if (intersects[axis] != undefined) {
                        if (intersects[axis] == index) {
                            intersects[axis] ==
                        } else {
                            intersects[axis] = true;
                            return false;
                        }
                    } else {
                        intersects[axis] = index;
                    }

                    if (surfacePair[0] < angle.model.position[axis] && angle.model.position[axis] < surfacePair[1]) {

                    }
                });
             });

             intersects[axis] = false/true;
        });

        return intersects['x'] && intersects['y'] && intersects['z'];
    }
}
