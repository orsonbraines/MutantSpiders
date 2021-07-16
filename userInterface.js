window.addEventListener('mousemove',e=>{
	updateMouse(e);
});
window.addEventListener('mousedown',e=>{
	updateMouse(e);
});
window.addEventListener('mouseup',e=>{
	updateMouse(e);
});
window.addEventListener('keydown', keyListener);
window.addEventListener('keyup', keyListener);

function keyListener(e) {
	if(e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd') {
		let dir = [0,0];
		switch (e.key) {
			case 'w':
				dir[1] = -1;
				break;
			case 'a':
				dir[0] = -1;
				break;
			case 's':
				dir[1] = 1;
				break;
			case 'd':
				dir[0] = 1;
				break;
		}
		player.changeDir(e.type === 'keydown', dir);
	}
}

//calculates new mouse position and new pushes mouse to last mouse
function updateMouse(e){
	let c = canvas.getBoundingClientRect();
	Object.assign(lastMouse,mouse);
	mouse.x = e.clientX - c.x;
	mouse.y = e.clientY - c.y;
	mouse.button = e.buttons;
}
