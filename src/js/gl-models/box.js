class GLBox {
    constructor (scene, positionObj, sizeObj, textureObj) {
        this.box = BABYLON.Mesh.CreateBox("box", 1, scene, false, BABYLON.Mesh.DEFAULTSIDE);

        this.box.position = new BABYLON.Vector3(positionObj.x, positionObj.y, positionObj.z);
        this.box.scaling = new BABYLON.Vector3(sizeObj.w, sizeObj.h, sizeObj.d);

        var materialBox = new BABYLON.StandardMaterial("texture", scene);
        if (typeof textureObj == "object") {
            materialBox.diffuseColor = new BABYLON.Color3(textureObj.R, textureObj.G, textureObj.B);
            materialBox.alpha = textureObj.A;
            materialBox.wireframe = true;
        } else if (typeof textureObj == "string") {
            materialBox.diffuseTexture = new BABYLON.Texture("../img/textures/" + textureObj, scene);
            materialBox.diffuseTexture.hasAlpha = true;
        }
        this.box.material = materialBox;

        // new Sphere(scene, {
        //     x: positionObj.x * sizeObj.w,
        //     y: positionObj.y * sizeObj.h,
        //     z: positionObj.z * sizeObj.d * 2
        // });

        return this.box;
    }

    moveTo (x, y, z) {this.position = new BABYLON.Vector3(x, y, z);}
    incX () {this.position.x++;}
    incY () {this.position.y++;}
    incZ () {this.position.z++;}
    decX () {this.position.x--;}
    decY () {this.position.y--;}
    decZ () {this.position.z--;}

    rotate (x, y, z) {this.rotation = new BABYLON.Vector3(x, y, z);}
    rotateAlpha (x) {this.rotation.x = x;}
    rotateBeta (y) {this.rotation.y = y;}
    rotateGamma (z) {this.rotation.z = z;}
    rotateAlpha90 () {this.rotation.x++;}
    rotateBeta90 () {this.rotation.y++;}
    rotateGamma90 () {this.rotation.z++;}
}
