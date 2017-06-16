let BOXES_COUNT = parseInt(prompt('Box count: ', '10')),
	DELTA = 0.25,
	EPS = 0.001,
	canvas, engine;

window.onload = () => {
	canvas = document.getElementById("renderCanvas");
	engine = new BABYLON.Engine(canvas, true);

	let scene = createScene();

	setVues();

	engine.runRenderLoop(() => {
		scene.render();
	});
};

function setVues () {
    let arrows = new Vue({
        el: '.arrows',
        data: {
			up: false,
			right: false,
			down: false,
			left: false
        },
		created: function () {
            window.addEventListener('keydown', (e) => {
				if (e.keyCode == 37) this.left = true;
				else if (e.keyCode == 38) this.up = true;
				else if (e.keyCode == 39) this.right = true;
				else if (e.keyCode == 40) this.down = true;
			});
            window.addEventListener('keyup', (e) => {
				if (e.keyCode == 37) this.left = false;
				else if (e.keyCode == 38) this.up = false;
				else if (e.keyCode == 39) this.right = false;
				else if (e.keyCode == 40) this.down = false;
			});
	    }
    });

    let stats = new Vue({
        el: '.stats',
		data: {
			storage: storage
		},
        methods: {
            totalContainers: () => storage.boxes.length,
			storedContainers: () => storage.getStoredBoxesCount(),
            filledVoume: () => parseInt(storage.getStoredVolume() * 100)
        }
    });
}
