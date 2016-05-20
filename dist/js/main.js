/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// var THREE = require('threejs');
	var scene = __webpack_require__(1);

	var container;

	window.addEventListener('load', function() {
	  container = document.querySelector('.threejs-scene');

	  scene.init(container, 'dist/json/test.js');
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var THREE = __webpack_require__(2);

	// Define vars
	var scene;
	var renderer;
	var camera;
	var light;
	var clock;
	var loader;
	var WIDTH;
	var HEIGHT;
	var VIEW_ANGLE;
	var ASPECT;
	var NEAR;
	var FAR;

	module.exports = {

	  init: function(container, json) {
	    clock = new THREE.Clock();

	    WIDTH = window.innerWidth;
	    HEIGHT = window.innerHeight;

	    VIEW_ANGLE = 45;
	    ASPECT = WIDTH / HEIGHT;
	    NEAR = 1;
	    FAR = 10000;

	    scene = new THREE.Scene();

	    renderer = new THREE.WebGLRenderer({
	      alpha: true,
	      antialias: true
	    });

	    renderer.setSize(WIDTH, HEIGHT);
	    renderer.shadowMapEnabled = true;
	    renderer.shadowMapSoft = true;
	    renderer.shadowMapType = THREE.PCFShadowMap;
	    renderer.shadowMapAutoUpdate = true;

	    container.appendChild(renderer.domElement);

	    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

	    camera.position.set(0, 1000, 3000);
	    camera.rotation.x = -Math.PI / 12;

	    scene.add(camera);

	    light = new THREE.DirectionalLight(0xffffff);

	    light.position.set(0, 100, 60);
	    light.castShadow = true;
	    light.shadowCameraLeft = -60;
	    light.shadowCameraTop = -60;
	    light.shadowCameraRight = 60;
	    light.shadowCameraBottom = 60;
	    light.shadowCameraNear = 1;
	    light.shadowCameraFar = 1000;
	    light.shadowBias = -0.0001;
	    light.shadowMapWidth = light.shadowMapHeight = 1024;
	    light.shadowDarkness = 0.7;

	    scene.add(light);

	    var mesh;

	    /**
	     * Render scene.
	     */
	    function render() {
	      // var time = clock.getElapsedTime();
	      mesh.rotation.y += 0.01;

	      renderer.render(scene, camera);
	      requestAnimationFrame(render);
	    }

	    loader = new THREE.JSONLoader();
	    loader.load(json, function(geometry, materials) {
	      console.log(geometry);
	      console.log(materials);

	      var material = new THREE.MultiMaterial(materials);

	      // var material = new THREE.MeshLambertMaterial({
	      //   map: THREE.ImageUtils.loadTexture('/js/threejs/models/textures/gtare.jpg'),
	      //   colorAmbient: [0.480000026226044, 0.480000026226044, 0.480000026226044],
	      //   colorDiffuse: [0.480000026226044, 0.480000026226044, 0.480000026226044],
	      //   colorSpecular: [0.8999999761581421, 0.8999999761581421, 0.8999999761581421]
	      // });

	      mesh = new THREE.Mesh(
	        geometry,
	        material
	      );

	      mesh.receiveShadow = true;
	      mesh.castShadow = true;
	      mesh.rotation.y = -Math.PI / 5;

	      scene.add(mesh);
	      render();
	    });
	  }

	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = THREE;

/***/ }
/******/ ]);