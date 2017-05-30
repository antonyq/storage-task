class Angle {
    constructor (options) {
        this.model = BABYLON.Mesh.CreateSphere('sphere', 16, 2, options.scene);

        this.model.position = new BABYLON.Vector3(options.x, options.y, options.z);
        this.model.scaling = new BABYLON.Vector3(options.w, options.h, options.d);

        var material = new BABYLON.StandardMaterial("texture", options.scene);
        material.diffuseColor = new BABYLON.Color3(0, 1, 1.2);
        this.model.material = material;
    }
}
