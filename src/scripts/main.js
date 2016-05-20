// var THREE = require('threejs');
var scene = require('./scene.js');

var container;

window.addEventListener('load', function() {
  container = document.querySelector('.threejs-scene');

  scene.init(container, 'dist/json/test.js');
});
