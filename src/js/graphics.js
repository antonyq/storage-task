var canvas, engine;

function createScene () {
    var storage = new Storage();

    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.FromInts(0, 0, 0);

    var camera = new GL_Camera(scene);
    var light = new GL_Light(scene, 0.7);

    var container = new GL_Box(scene,
        {x: 0, y: 0, z: 0},
        {w: 10, h: 10, d: 20},
        {R: 10, G: 0, B: 10, A: 0.5}
    );

    // for (var box in storage.boxes){
    //     new Box(scene,
    //         box.position,
    //         {w: 2, h: 2, d: 2},
    //         "metal/3.jpg"
    //     );
    // }

    scene.registerBeforeRender(() => {
        // storage update
        if (box.position.x < 0 &&
            box.position.y < 0) {
            box.position.x += 0.1;
            box.position.y += 0.1;
        } else {
            box.rotateAlpha(alpha += 0.01);
        }
        camera.alpha += 0.001;
    });

    return scene;
}

function GL_Camera (scene) {
    this.camera = new BABYLON.ArcRotateCamera("Camera", -1, 1.2, 50, new BABYLON.Vector3.Zero(), scene);

    this.camera.attachControl(canvas, false);
    return this.camera;
}

function GL_Light (scene, intensity) {
    this.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    this.light.intensity = intensity;
    return this.light;
}

function GL_Box (scene, positionObj, sizeObj, textureObj) {
    this.box = BABYLON.Mesh.CreateBox("box", 1, scene, false, BABYLON.Mesh.DEFAULTSIDE);

    this.box.position = new BABYLON.Vector3(positionObj.x, positionObj.y, positionObj.z);
    this.box.scaling = new BABYLON.Vector3(sizeObj.w, sizeObj.h, sizeObj.d);

    var materialBox = new BABYLON.StandardMaterial("texture", scene);
    if (typeof textureObj == "object") {
        materialBox.diffuseColor = new BABYLON.Color3(textureObj.R, textureObj.G, textureObj.B);
        materialBox.alpha = textureObj.A;
        materialBox.wireframe = true;
    } else if (typeof textureObj == "string") {
        materialBox.diffuseTexture = new BABYLON.Texture("img/textures/" + textureObj, scene);
        materialBox.diffuseTexture.hasAlpha = true;
    }
    this.box.material = materialBox;

    this.box.moveTo = function (x, y, z) {  this.position = new BABYLON.Vector3(x, y, z);  };
    this.box.incX = function () {  this.position.x++;  };
    this.box.incY = function () {  this.position.y++;  };
    this.box.incZ = function () {  this.position.z++;  };
    this.box.decX = function () {  this.position.x--;  };
    this.box.decY = function () {  this.position.y--;  };
    this.box.decZ = function () {  this.position.z--;  };

    this.box.rotate = function (x, y, z) {  this.rotation = new BABYLON.Vector3(x, y, z);  };
    this.box.rotateAlpha = function (x) {  this.rotation.x = x;  };
    this.box.rotateBeta = function (y) {  this.rotation.y = y;  };
    this.box.rotateGamma = function (z) {  this.rotation.z = z;  };
    this.box.rotateAlpha90 = function () {  this.rotation.x++;  };
    this.box.rotateBeta90 = function () {  this.rotation.y++;  };
    this.box.rotateGamma90 = function () {  this.rotation.z++;  };

    // new GL_Sphere(scene, {
    //     x: positionObj.x * sizeObj.w,
    //     y: positionObj.y * sizeObj.h,
    //     z: positionObj.z * sizeObj.d * 2
    // });

    return this.box;
}

function GL_Sphere (scene, positionObj, sizeObj={w: 0.2, h: 0.2, d: 0.2}) {
    this.sphere = BABYLON.Mesh.CreateSphere('sphere', 16, 2, scene);

    this.sphere.position = new BABYLON.Vector3(positionObj.x, positionObj.y, positionObj.z);
    this.sphere.scaling = new BABYLON.Vector3(sizeObj.w, sizeObj.h, sizeObj.d);

    var material = new BABYLON.StandardMaterial("texture", scene);
    material.diffuseColor = new BABYLON.Color3(0, 1, 1.2);
    this.sphere.material = material;

    return this.sphere;
}
