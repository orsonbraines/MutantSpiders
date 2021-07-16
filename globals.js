const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var frames = 0;
var spider;
var player;

var mouse = {
	x:0,
	y:0,
	button:0,
}
var lastMouse = {...mouse};
