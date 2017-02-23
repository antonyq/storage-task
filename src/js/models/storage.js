function Storage () {
    var windowWidth = $("#renderCanvas").attr("width"),
        windowHeight = $("#renderCanvas").attr("height");

    this.boxes = [];

    this.generateBoxes = function (count = 1) {
        function isBoxPlaced (box) {
            return true; // false
        }

        while (this.boxes.length < count) {
            this.boxes.push(new Box(...));
        }
    };

}

