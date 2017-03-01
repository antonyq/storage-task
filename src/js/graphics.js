var canvas, engine;

function createScene () {
    var GLBoxes = [];

    var storage = new Storage({w:10, h:10, d:20}, 100, 2);

    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.FromInts(0, 0, 0);

    var camera = new GLCamera(scene, canvas);
    var light = new GLLight(scene, 0.7);

    var container = new GLBox(
        scene,
        storage.position,
        storage.size,
        {R:10,G:0,B:10,A:0.5}
    );

    storage.iterateBoxes(function (box, number) {
        GLBoxes.push(new GLBox(
            scene,
            box.position,
            box.size,
            "metal/3.jpg"
        ));
    });

    scene.registerBeforeRender(() => {
        storage.iterateBoxes(function (box, number) {
            if (number) {
                storage.boxes[number].position.x += 0.1;
                storage.boxes[number].position.y += 0.1;

                GLBoxes[number].position.x += 0.1;
                GLBoxes[number].position.y += 0.1;
            } else {
                storage.boxes[number].position.x -= 0.1;
                storage.boxes[number].position.y -= 0.1;

                GLBoxes[number].position.x -= 0.1;
                GLBoxes[number].position.y -= 0.1;
            }
        });
        camera.alpha += 0.001;
    });

    return scene;
}
