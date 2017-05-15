var BOXES_COUNT = parseInt(prompt('Box count: ', '5')),
	canvas, engine;

window.onload = () => {
	canvas = document.getElementById("renderCanvas");
	engine = new BABYLON.Engine(canvas, true);

	var scene = createScene();

	engine.runRenderLoop(() => {
		scene.render();
	});

	initEventListeners();
};

function initEventListeners () {
	window.addEventListener("resize", () => {
		engine.resize();
	});

	document.onkeydown = function () {
		switch (window.event.keyCode) {
			case 37:
				$("#left").addClass("highlighted");
				break;
			case 38:
				$("#top").addClass("highlighted");
				break;
			case 39:
				$("#right").addClass("highlighted");
				break;
			case 40:
				$("#bottom").addClass("highlighted");
				break;
		}
	};

	document.onkeyup = function () {
		switch (window.event.keyCode) {
			case 37:
				$("#left").removeClass("highlighted");
				break;
			case 38:
				$("#top").removeClass("highlighted");
				break;
			case 39:
				$("#right").removeClass("highlighted");
				break;
			case 40:
				$("#bottom").removeClass("highlighted");
				break;
		}
	}
};
