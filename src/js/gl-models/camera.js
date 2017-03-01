class GLCamera {
    constructor (scene, canvas) {
        this.camera = new BABYLON.ArcRotateCamera("Camera", -1, 1.2, 50, new BABYLON.Vector3.Zero(), scene);
        this.camera.attachControl(canvas, false);
        return this.camera;
    }
}
