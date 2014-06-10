define(['core/utils/Mapper', 'threex/particles/ParticleEngine', 'threejs', 'Leap', 'use!OrbitControls', 'TweenMax'], function(Mapper, ParticleEngine) {
	var ThreeController = function(container, options) {
		options = options || {};
		var scope = this;
		var callback = options.callbacks.onRender;
        var scene = options.scene || new THREE.Scene();

		// ------
		// Camera
		var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000);
        camera.target = new THREE.Vector3(0, 0, 0);
        camera.lookAt(camera.target);
        camera.position.set(0, 0, 1200);
		var camRadius = 790;
		//var fov = camera.fov;

		var active = false;
		// ------
		// Renderer
		var renderer = new THREE.WebGLRenderer({
			antialias: false
		});
        renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.shadowMapEnabled = true;
		container.appendChild(renderer.domElement);
		// ------

		// Controls
		var controls = new THREE.OrbitControls(camera, renderer.domElement);
        //controls.autoRotate = true;
        //controls.autoRotateSpeed = 8.0;
		//controls.target.set(0, 0, 0);
		// ------

		// Canvas
		var canvas = container.getElementsByTagName('canvas')[0];
		var width = canvas.width;
		var height = canvas.height;
		// ------
        //var light = new THREE.AmbientLight(0xffffff);
		//light.position.set( 0, 600, 0).normalize();
        //scene.add(light);

		var light = new THREE.DirectionalLight(0xffffff, 1);
        light.intensity = 0.3;
        light.position.set( -300, 500, -900).normalize();
        light.castShadow = true;
		//light.shadowCameraVisible = true;
        scene.add(light);

		light = new THREE.DirectionalLight(0x0040ff, 1);
        light.intensity = 0.3;
        light.position.set(900, 300, -400);
        light.castShadow = true;
		//light.shadowCameraVisible = true;
        scene.add(light);

        // Lamp

        light = new THREE.PointLight( 0xb26b00, 0.1 );
        light.position.set(-285, -90, 450);
        scene.add(light);

        var sphere = new THREE.SphereGeometry( 5, 16, 3 );
        var lamp = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xb26b00 } ) );
        lamp.position = light.position;
        scene.add(lamp);

        // Moon
        sphere = new THREE.SphereGeometry( 50, 16, 5 );
        var moon = new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xcccccc } ) );
        moon.position.set(0, 400, -900);
        scene.add(moon);

		// Geometry
		var material, geometry, mesh;

		// Ground plane
        //material = new THREE.MeshBasicMaterial({
            //color: 0xffffff,
        //});

        //geometry = new THREE.CubeGeometry(2300, 10, 2300);
        //mesh = new THREE.Mesh(geometry, material);
        //mesh.position.set(0, - 10, 0);
        //scene.add(mesh);

        material = new THREE.MeshPhongMaterial({
            ambient: 0x555555,
            color: 0xffffff,
            specular: 0xffffff,
            shininess: 40,
            vertexColors: THREE.FaceColors,
            shading: THREE.FlatShading
        });
        material.side = THREE.DoubleSide;

        // Terrain
        var loader = new THREE.JSONLoader(true);
        loader.load('assets/models/terrain.js', function(g, m) {
            for (var i = 0, len = m.length; i < len; i++) {
                m[i].shading = THREE.FlatShading;
                m[i].side = THREE.DoubleSide;
            }
            mesh = new THREE.Mesh(g, new THREE.MeshFaceMaterial(m));
            mesh.scale.set(50, 50, 50);
            mesh.position.y = -200;
            scene.add(mesh);
        });

        var particleEngine = new ParticleEngine(scene);

        // Create point lights
        var particles = particleEngine.getParticles();
        var interval = particles.length / 10;
        var pointLightTargets = [];
        var pointLights = [];
        for (var i = 0, len = particles.length; i < len; i++) {
            if (Math.floor(i % interval) === 0) {
                var p = particles[i];
                pointLightTargets.push(p);
                //pointLight = new THREE.PointLight( 0x0040ff, 0 );
                pointLight = new THREE.PointLight( 0x0040ff, 0 );
                pointLight.position.set(p.x, p.y, p.z);
                pointLights.push(pointLight);
                scene.add(pointLight);
            }
        }



        this.onHit = function(x, y) {
            particleEngine.generate(x, y);
        };

        var onMouseDown = function(evt) {
            for (var i = 0; i < 10; i++) {
                particleEngine.generate( (evt.pageX || evt.clientX) + (Math.random() * 40 - 20), (evt.pageY || evt.clientY) + (Math.random() * 40 - 20));
            }
        };

        var onMouseUp = function() {
            TweenMax.to(camera.position, 0.5, {x: 0, y: 0, z: 1200});
            //camera.position.set(0, 0, 1200);
        };

        document.addEventListener( 'mousedown', onMouseDown, false );
        document.addEventListener( 'mouseup', onMouseUp, false );

		var animate = function() {
			requestAnimationFrame(animate);
			controls.update();
			renderer.render(scene, camera);
            particleEngine.update();
            //var time = Date.now() * 0.001;
            //camera.position.x = Math.sin( time * 1 ) * 100;
            //camera.position.y = Math.cos( time * 1 ) * 0;
            //camera.position.z = Math.cos( time * 1 ) * 0 + 1200;

            for (var i = 0, len = pointLights.length; i < len; i++) {
                var plt = pointLightTargets[i];
                var pl = pointLights[i];
                if (plt.alive) {
                    pl.intensity = 0.2;
                    pl.position.x = plt.x;
                    pl.position.y = plt.y;
                    pl.position.z = plt.z;
                    //pl.position.x = Math.sin( time * 1 ) * 400;
                    //pl.position.y = Math.cos( time * 1 ) * 100;
                    //pl.position.z = Math.cos( time * 1 ) * 600;
                } else {
                    pl.intensity = 0;
                }
            }


		};

		animate();
	};

	return ThreeController;
});

