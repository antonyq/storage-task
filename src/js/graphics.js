function createScene () {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.FromInts(0, 0, 0);


    var storage = new Storage({
        scene: scene,
        x: 1,
        y: 1,
        z: 1,
        w: 30,
        h: 20,
        d: 20,
        R: 10,
        G: 0,
        B: 10,
        A: 0.5,
        boxCount: BOXES_COUNT
    });

    storage.boxes[0].directiveX = true;
    storage.boxes[0].directiveY = true;



    var camera = new BABYLON.ArcRotateCamera("Camera", -2, 1.2, 50, new BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, false);

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    var delta = 0.25, eps = 0.001;

    updateStats(storage);

    scene.registerBeforeRender(() => {
        storage.boxes.every((box, index) => {
            if (!box.stored) {
                var targetCoords = storage.getNextPoint();

                if (targetCoords) {
                    if (! box.isInPoint(targetCoords)) {
                       box.move(targetCoords, delta);
                       return false;
                    } else {
                        box.stored = true;

                        if (typeof box.directiveX == 'boolean') {
                            box.directiveX = true;
                        }

                        if (typeof box.directiveY == 'boolean') {
                            box.directiveX = true;
                            box.directiveY = true;
                        }

                        updateStats(storage);

                        storage.boxes.forEach((box1Temp, index1Temp) => {
                            if (box1Temp.stored) {
                                storage.boxes.forEach((box2Temp, index2Temp) => {
                                    if (box2Temp.stored && index1Temp != index2Temp && box1Temp.intersects(box2Temp, 0.1)) {
                                        box1Temp.model.material = new BABYLON.StandardMaterial("texture", scene);
                                        box1Temp.model.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
                                    }
                                });
                            }
                        });
                    }
                }
            } else return true;
        });

        // camera.alpha += 0.001;
    });

    return scene;
}

function updateStats (storage) {
    $('.stored-containers-count').html(`${storage.getStoredBoxesCount()}/${storage.boxes.length}`);
    $('.filled-volume').html(`${parseInt(storage.getStoredVolume() * 100)}%`);
}
