var START_TIME,
	$TIMER;

window.onload = () => {
	START_TIME = new Date();
	$TIMER = $("#timer");
	canvas = document.getElementById("renderCanvas");
	engine = new BABYLON.Engine(canvas, true);

	var scene = createScene(engine, canvas);

	var timer = setInterval(function ( ) {
		var deltaDate = new Date((new Date()) - START_TIME);
		$TIMER.html(deltaDate.getMinutes() + ":" + deltaDate.getSeconds() + ":" + deltaDate.getMilliseconds());
	}, 1);

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