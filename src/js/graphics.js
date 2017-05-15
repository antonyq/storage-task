function createScene () {
    var scene = new BABYLON.Scene(engine);
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


    var camera = new BABYLON.ArcRotateCamera("Camera", -2, 1.2, 50, new BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, false);

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    var storageCoords = storage.anglePoints[0].model.position,
        delta = 0.1, eps = 0.01;

    scene.registerBeforeRender(() => {
        storage.boxes.every((box, index) => {
            if (!box.stored) {
                var targetCoords = {
                    x: (index != 0) ? storage.boxes[index-1].anglePoints[7].model.position.x : storageCoords.x,
                    y: (index != 0) ? storage.boxes[index-1].anglePoints[7].model.position.y : storageCoords.y,
                    z: (index != 0) ? storage.boxes[index-1].anglePoints[7].model.position.z : storageCoords.z
                }

                if (Math.sqrt(
                       (box.anglePoints[0].model.position.x - targetCoords.x)**2 +
                       (box.anglePoints[0].model.position.y - targetCoords.y)**2 +
                       (box.anglePoints[0].model.position.z - targetCoords.z)**2
                   ) > delta) {
                    box.move(targetCoords, eps, delta);
                    return false;
                } else {
                    box.stored = true;
                }
            } else return true;
        });

        // camera.alpha += 0.001;
    });

    return scene;
}
