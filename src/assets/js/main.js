require(['core/utils/FpsTracker', 'dom/primitives/Container', 'proj/ThreeController', 'proj/OutputText', 'canvas/detection/GridDetector', 'threejs'], function(FpsTracker, Container, ThreeController, OutputText, GridDetector) {
	var Master = function() {

		// Scene
		var scene = new THREE.Scene();

		var init = function() {
			// Fps
			//var fps = new FpsTracker();

			var container = new Container({
				insert: {
					type: 'parent',
					target: document.body
				}
			});

            var ot = new OutputText();

			var tc = new ThreeController(container.el, {
				callbacks: {
					onRender: function(frame) {
						//fps.update();
					}
				},
                scene: scene
			});

            var gd = new GridDetector(container, tc.onHit);
		};

		init();

	}; // End
	var master = new Master();
});
