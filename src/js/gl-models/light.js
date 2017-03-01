class GLLight {
    constructor (scene, intensity) {
        this.light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

        this.light.intensity = intensity;
        return this.light;
    }
}
