var mouse = {
	x:0,
	y:0,
	button:0,
}
var lastMouse = {...mouse};

window.addEventListener('mousemove',e=>{
	updateMouse(e);
});
window.addEventListener('mousedown',e=>{
	updateMouse(e);
});
window.addEventListener('mouseup',e=>{
	updateMouse(e);
});

//calculates new mouse position and new pushes mouse to last mouse
function updateMouse(e){
	let c = canvas.getBoundingClientRect();
	Object.assign(lastMouse,mouse);
  mouse.x = e.clientX - c.x;
  mouse.y = e.clientY - c.y;
	mouse.button = e.buttons;
}
