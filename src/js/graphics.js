function createScene () {
    let scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.FromInts(0, 0, 0);

    let storage = new Storage({
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

    let camera = new BABYLON.ArcRotateCamera("Camera", -2, 1.2, 50, new BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, false);

    let light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    updateStats(storage);

    scene.registerBeforeRender(() => {
        updateModels(storage);

        // camera.alpha += 0.001;
    });

    return scene;
}

function updateModels (storage) {
    storage.boxes.every((box, index) => {
        if (! box.stored) {
            let targetCoords = storage.getNextPoint();

            if (targetCoords) {
                if (! box.inPoint(targetCoords)) {
                   box.move(targetCoords, DELTA);
                   return false;
                } else {
                    box.stored = true;

                    if (typeof box.directiveY == 'boolean') {
                        box.directiveX = true;
                        box.directiveY = true;
                    } else if (typeof box.directiveX == 'boolean') {
                        box.directiveX = true;
                    }

                    highlightCrossedBoxes(storage);

                    updateStats(storage);
                }
            }
        } else return true;
    });
}

function highlightCrossedBoxes (storage) {
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
