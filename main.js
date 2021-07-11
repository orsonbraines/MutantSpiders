const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var frames = 0;
var spider;

initGame();

function resizeCanvas(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function initGame(){
	resizeCanvas();
	frames = 0;
	ctx.strokeStyle = "#000";
	ctx.lineWidth = 2;
	ctx.lineCap = 'round';
	spider = new Spider();
	gameLoop();
}

window.addEventListener('resize',e => {
	resizeCanvas();
});

function gameLoop(){
	drawGame();
	frames++;
	requestAnimationFrame(gameLoop);
}
function drawGame(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	if(frames % 10 == 0) spider.tick();
	spider.draw(ctx);
}
