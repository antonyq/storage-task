function Storage (sizeObj, volume) {
    Box.call(this);
    this.boxes = [];
}

Storage.prototype.getStoredVolume = function () {
    var boxVolumes = this.boxes.map((elem) => (elem.stored) ? (elem.volume || 0) : 0);
    return boxVolumes.reduce((prev, curr) => prev + curr, 0);
}

Storage.prototype.getAvailableVolume = function () {
    return this.volume - this.getStoredVolume();
}

// Storage.prototype.generateBox = function () {
//
// }

// Storage.prototype.generateBoxes = function () {
//
// }
