class Spahere {
    constructor (scene, positionObj, sizeObj={w: 0.2, h: 0.2, d: 0.2}) {
        this.sphere = BABYLON.Mesh.CreateSphere('sphere', 16, 2, scene);

        this.sphere.position = new BABYLON.Vector3(positionObj.x, positionObj.y, positionObj.z);
        this.sphere.scaling = new BABYLON.Vector3(sizeObj.w, sizeObj.h, sizeObj.d);

        var material = new BABYLON.StandardMaterial("texture", scene);
        material.diffuseColor = new BABYLON.Color3(0, 1, 1.2);
        this.sphere.material = material;

        return this.sphere;
    }
}
