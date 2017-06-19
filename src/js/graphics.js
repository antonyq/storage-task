function createScene () {
    let scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.FromInts(0, 0, 0);

    window['storage'] = new Storage({
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

    scene.registerBeforeRender(() => {
        if (storage.getNotStoredBoxes().length > 0) {
            updateModels(scene);
        }

        // camera.alpha += 0.1;
    });

    return scene;
}

function updateModels (scene) {
    let notStoredBoxes = storage.getNotStoredBoxes();
    notStoredBoxes.every((box, index) => {
        let targetCoords = storage.getNextPoint();

        if (targetCoords) {
            if (! box.inPoint(targetCoords)) {
               box.move(targetCoords, DELTA);
               return false;
            } else {
                box.stored = true;

                highlightCrossedBoxes(scene);

                if (typeof box.directiveY == 'boolean') {
                    box.directiveX = true;
                    box.directiveY = true;
                } else if (typeof box.directiveX == 'boolean') {
                    box.directiveX = true;
                }
            }
        }
    });
}

function highlightCrossedBoxes (scene) {
    let storedBoxes = storage.getStoredBoxes();
    for (let i = 0; i < storedBoxes.length; i++) {
        for (let j = 0; j < storedBoxes.length; j++) {
            if (i != j && storedBoxes[i].intersects(storedBoxes[j], 1)) {
                let color = {
                    r: Math.random(),
                    g: Math.random(),
                    b: Math.random(),
                };
                storedBoxes[i].model.material = new BABYLON.StandardMaterial("texture", scene);
                storedBoxes[i].model.material.diffuseColor = new BABYLON.Color3(color.r, color.g, color.b);
                storedBoxes[j].model.material = new BABYLON.StandardMaterial("texture", scene);
                storedBoxes[j].model.material.diffuseColor = new BABYLON.Color3(color.r, color.g, color.b);
            }
        }
    }
}
